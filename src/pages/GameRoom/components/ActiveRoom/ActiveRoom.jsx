import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../../../../components/Button/Button";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import api from "../../../../service/service";
import "./ActiveRoom.css";
import { useNavigate } from "react-router-dom";

function isAlive(user, gameroom) {
  const player = gameroom.state.players.filter(
    (player) => player.user._id === user._id
  )[0];
  if (!player) return undefined;

  if (player.status === "Alive") return true;
  return false;
}

function ActiveRoom({ room, createGameActionHandler, displaySettings }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const player = room.state.players.filter(
    (player) => player.user._id === user._id
  )[0];

  // People that are not participating in the game cannot view the games actions
  if (!player) return navigate("/home");

  const isAlive = player.status === "Alive";

  const isVoteCast = player.vote.state === "Cast";
  const isVoteLocked = player.vote.state === "Locked";

  return (
    <div className="ActiveRoom">
      <div className="playerlist">
        {room.state.players.map((player) => (
          <PlayerCard
            key={player.user._id}
            player={player}
            onClick={() => {
              createGameActionHandler("castVote", player.user._id)()
                .then(() => {})
                .catch((error) => {});
            }}
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
            action={() => {
              createGameActionHandler("lockVote")()
                .then(() => {})
                .catch((error) => {});
            }}
          >
            Lock Your Vote
          </Button>
        )}
      </div>
    </div>
  );
}

export default ActiveRoom;
