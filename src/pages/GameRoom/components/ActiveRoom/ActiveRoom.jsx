import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../../../../components/Button/Button";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import api from "../../../../service/service";
import "./ActiveRoom.css";

function ActiveRoom({ room, createGameActionHandler, displaySettings }) {
  const { user } = useContext(AuthContext);
  const isPlayerAbleToLockVote = true;
  const isOwner = user._id === room.owner;
  const isSignedUp = room.state.players.some(
    (player) => player.user._id === user._id
  );

  return (
    <div className="ActiveRoom">
      <div className="playerlist">
        {room.state.players.map((player) => (
          <PlayerCard
            key={player.user._id}
            player={player}
            onClick={createGameActionHandler("castVote", player.user._id)}
            className={player.status.toLowerCase()}
            votes={room.state.players.filter(
              (p) => p.vote.target === player.user._id
            )}
          />
        ))}
      </div>

      {isPlayerAbleToLockVote && (
        <div className="player-options">
          {isSignedUp && (
            <Button
              variant="primary"
              action={createGameActionHandler("lockVote")}
            >
              Lock Your Vote
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ActiveRoom;
