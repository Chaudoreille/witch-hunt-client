import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../../../../components/Button/Button";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./ActiveRoom.css";
import { useNavigate } from "react-router-dom";

function ActiveRoom({ room, createGameActionHandler }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const player = room.state.players.filter(
    (player) => player.user._id === user._id
  )[0];

  // People that are not participating in the game cannot view the games actions
  if (!player) return navigate("/home");

  const isAlive = player.status === "Alive";

  const isVoteCast = player.vote.state === "Cast";
  // const isVoteLocked = player.vote.state === "Locked";

  return (
    <div className="ActiveRoom">
      <div className="playerlist">
        {room.state.players.map((player) => (
          <PlayerCard
            key={`PlayerCard-${player.user._id}`}
            player={player}
            onClick={createGameActionHandler("castVote", [player.user._id])}
            className={player.status.toLowerCase()}
            votes={room.state.players.filter(
              (p) => p.vote.target === player.user._id
            )}
          />
        ))}
      </div>

      <div className="player-options">
        {isAlive && isVoteCast && (
          <Button
            variant="primary"
            action={createGameActionHandler("lockVote")}
          >
            Lock Your Vote
          </Button>
        )}
      </div>
    </div>
  );
}

export default ActiveRoom;
