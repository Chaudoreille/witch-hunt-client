import PlayerCard from "../PlayerCard/PlayerCard";
import Button from "../Button/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/service";
import "./ActiveRoom.css";

function ActiveRoom({ room, createGameActionHandler }) {
  const { user } = useContext(AuthContext);

  const isOwner = user._id === room.owner;
  const isSignedUp = room.state.players.some(
    (player) => player.user._id === user._id
  );

  return (
    <div className="ActiveRoom">
      <div className="room-header">
        <h2>Active Game! {room.name}</h2>
        <div>
          {
            room.state.players.filter((player) => player.status === "Alive")
              .length
          }
          /{room.maxPlayers}
        </div>
      </div>
      <div className="playerlist">
        {room.state.players.map((player) => (
          <PlayerCard key={player.user._id} player={player} />
        ))}
      </div>
      {isOwner ? (
        <div className="owner-options">
          Change Settings Options to be added here. Feel free to move div
          around...
          <Button variant="secondary" action={() => api.deleteRoom(room._id)}>
            Close Game and Delete Game Room
          </Button>
        </div>
      ) : (
        <div className="player-options">
          {isSignedUp && (
            <Button variant="primary" action={createGameActionHandler("leave")}>
              Leave Game
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ActiveRoom;
