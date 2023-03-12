import React, { useReducer, useContext } from "react";
import api from "../../service/service";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import GameRoomForm from "../../components/GameRoomForm/GameRoomForm";
import "./CreateGame.css";

function reducer(state, action) {
  return { ...state, ...action };
}

function CreateGame() {
  const [room, dispatchRoom] = useReducer(reducer, {
    name: "",
    maxPlayers: 10,
    isPublished: true,
    spokenLanguage: "English",
  });
  console.log("room", room);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    api
      .createRoom(room)
      .then((newRoom) => {
        const roomId = newRoom._id;
        navigate(`/lobbies/${newRoom._id}`);
      })
      // TODO display error message
      .catch((error) => console.error(error));
  }

  return (
    <section className="CreateGame">
      <div className="header-row">
        <img src={user.image} alt={user.username} />
        <div>@{user.username}, let's create your game! </div>
      </div>
      <GameRoomForm
        handleSubmit={handleSubmit}
        room={room}
        submitButtonLabel="Create"
        dispatchRoomChanges={dispatchRoom}
      />
    </section>
  );
}

export default CreateGame;
