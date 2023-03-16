import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import "./ActiveRoom.css";

import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../../../../components/Button/Button";
import ActionsBar from "../ActionsBar/ActionsBar";

function ActiveRoom({ room, createGameActionHandler, totalWitches, killed }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const player = room.state.players.find(player => player.user._id === user._id);

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
            onClick={createGameActionHandler("castVote", [cardPlayer.user._id])}
            className={cardPlayer.status.toLowerCase()}
            votes={room.state.players.filter(voter => {
              if (room.state.mode === "Nighttime" && player.role !== "Witch") {
                return false;
              }
              return voter.vote.target === cardPlayer.user._id;
            })}
          />
        ))}
      </div>

      <ActionsBar>
        <div className="witches">
          <img src="/images/witch.png" alt="witch hat" />
          <p>{killed || 0}/{totalWitches}</p>
        </div>
        {isAlive && isVoteCast && (
          <Button
            variant="primary"
            action={createGameActionHandler("lockVote")}
          >
            Lock Your Vote
          </Button>
        )}
      </ActionsBar>
    </div>
  );
};

export default ActiveRoom;
