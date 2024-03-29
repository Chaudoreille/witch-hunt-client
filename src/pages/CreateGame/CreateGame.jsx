import React, { useReducer, useContext, useState } from "react";
import api from "../../service/service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import GameRoomForm from "../../components/GameRoomForm/GameRoomForm";
import "./CreateGame.css";
import ErrorList from "../../components/ErrorList/ErrorList";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"

function reducer(state, action) {
  return { ...state, ...action };
}

function CreateGame() {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [room, dispatchRoom] = useReducer(reducer, {
    name: `${user.username}'s Witch hunt`,
    maxPlayers: 10,
    isPublished: true,
    spokenLanguage: "English",
  });

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    api
      .createRoom(room)
      .then((newRoom) => {
        const roomId = newRoom._id;
        navigate(`/games/${newRoom._id}`);
      })

      .catch((error) => {
        console.error(error);
        setErrors([error.message]);
      });
  }

  return (
    <section className="flex-center-section auth">
      <div className="window-center-grey auth CreateGame">
        <div className="header-row">
          <ProfilePicture user={user} />
          <div>@{user.username},<br /> let's create your game! </div>
        </div>
        {errors.length > 0 && <ErrorList messages={errors} />}
        <GameRoomForm
          handleSubmit={handleSubmit}
          room={room}
          submitButtonLabel="Create"
          dispatchRoomChanges={dispatchRoom}
        />
      </div>
    </section>
  );
}

export default CreateGame;
