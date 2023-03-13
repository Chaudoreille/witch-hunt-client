import { useContext, useState, useReducer, useEffect } from "react";
import "./WaitingRoom.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import { AuthContext } from "../../../../context/AuthContext";
import Button from "../../../../components/Button/Button";
import api from "../../../../service/service";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import GameRoomForm from "../../../../components/GameRoomForm/GameRoomForm";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function reducer(state, action) {
  return { ...state, ...action };
}

function WaitingRoom({
  room,
  createGameActionHandler,
  displaySettings,
  setDisplaySettings,
}) {
  const { user } = useContext(AuthContext);
  const [roomEditFormValues, dispatchRoomEditFormValues] = useReducer(
    reducer,
    room
  );
  const isOwner = user._id === room.owner;
  const isSignedUp = room.state.players.some(
    (player) => player.user._id === user._id
  );
  function handleSubmit(event) {
    event.preventDefault();
    api
      .updateRoom(room._id, roomEditFormValues)
      .then((updatedRoom) => {
        setDisplaySettings(false);
      })
      // TODO display error message
      .catch((error) => console.error(error));
  }

  return (
    <div className="WaitingRoom">
      <div className="room-header">
        <div className="row">
          {isOwner && (
            <SettingsOutlinedIcon
              className="clickable-icon"
              onClick={() => setDisplaySettings(!displaySettings)}
            />
          )}
          <h2>{room.name}</h2>
          <h4>({room.spokenLanguage})</h4>
        </div>
        <div className="row">
          <PermIdentityIcon className="icon-user" />
          {room.state.players.length}/{room.maxPlayers}
          {isOwner && (
            <Button variant="primary" action={createGameActionHandler("start")}>
              Start Game
            </Button>
          )}
        </div>
      </div>
      <div className="playerlist">
        {room.state.players.map((player) => (
          <PlayerCard key={player.user._id} player={player} />
        ))}
      </div>
      {displaySettings && (
        <>
          <div className="owner-options">
            <GameRoomForm
              handleSubmit={handleSubmit}
              room={roomEditFormValues}
              submitButtonLabel="Edit Room Settings"
              dispatchRoomChanges={dispatchRoomEditFormValues}
            />
            <Button variant="secondary" action={() => api.deleteRoom(room._id)}>
              Close Game and Delete Game Room
            </Button>
          </div>
        </>
      )}
      {isOwner ? (
        <h2 className="game-pin">
          Pin {room.pin}
          &nbsp;
          <FilterNoneOutlinedIcon
            className="clickable-icon"
            onClick={() => navigator.clipboard.writeText(room.pin)}
          />
        </h2>
      ) : (
        <div className="player-options">
          {isSignedUp ? (
            <Button variant="primary" action={createGameActionHandler("leave")}>
              Leave Game
            </Button>
          ) : (
            <Button variant="primary" action={createGameActionHandler("join")}>
              Join Game
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
