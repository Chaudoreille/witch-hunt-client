import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { SoundManagerContext } from "../../../../context/SoundManagerContext";

import "./ActiveRoom.css";

import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../../../../components/Button/Button";
import ActionsBar from "../ActionsBar/ActionsBar";

function ActiveRoom({
  room,
  createGameActionHandler,
  totalWitches,
  killed,
  dispatchErrors,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { playSoundEffect, playMusicTrack } = useContext(SoundManagerContext);

  useEffect(() => {
    playMusicTrack(room.state.mode.toLowerCase());
  }, [room.state.mode]);

  const player = room.state.players.find(
    (player) => player.user._id === user._id
  );

  function roleVisibility(opponent) {
    const canSeeWitchesAtNight = ["Witch", "Girl"];

    if (opponent._id === player._id || opponent.status === "Dead") {
      return true;
    }
    if (room.state.mode === "Nighttime") {
      if (
        opponent.role === "Witch" &&
        canSeeWitchesAtNight.includes(player.role)
      ) {
        return true;
      }
    }
    return false;
  }

  // People that are not participating in the game cannot view the games actions
  if (!player) return navigate("/home");

  const isAlive = player.status === "Alive";

  const isVoteCast = player.vote.state === "Cast";
  // const isVoteLocked = player.vote.state === "Locked";

  return (
    <div className="ActiveRoom">
      <div className="playerlist">
        {room.state.players.map((cardPlayer) => (
          <PlayerCard
            key={`PlayerCard-${cardPlayer.user._id}`}
            player={cardPlayer}
            onClick={createGameActionHandler(
              "castVote",
              [cardPlayer.user._id],
              (error) => {
                if (error) {
                  dispatchErrors(error);
                } else {
                  playSoundEffect("castVote");
                }
              }
            )}
            className={cardPlayer.status.toLowerCase()}
            votes={room.state.players.filter((voter) => {
              if (
                room.state.mode === "Nighttime" &&
                player.role !== voter.role
              ) {
                return false;
              }
              return voter.vote.target === cardPlayer.user._id;
            })}
            isRoleVisible={roleVisibility(cardPlayer)}
          />
        ))}
      </div>

      <ActionsBar>
        <div className="witches">
          <img src="/images/witch.png" alt="witch hat" />
          <p>
            {killed || 0}/{totalWitches}
          </p>
        </div>
        {isAlive && isVoteCast && (
          <Button
            variant="primary"
            action={createGameActionHandler("lockVote", [], (error) => {
              if (error) {
                dispatchErrors(error);
              } else {
                playSoundEffect("lockVote");
              }
            })}
          >
            Lock Your Vote
          </Button>
        )}
      </ActionsBar>
    </div>
  );
}

export default ActiveRoom;
