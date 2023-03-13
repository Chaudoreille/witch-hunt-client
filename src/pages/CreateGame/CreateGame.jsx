import React, { useReducer, useContext, useState } from "react";
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
        navigate(`/lobbies/${newRoom._id}`);
      })

      .catch((error) => {
        console.error(error);
        setErrors((errors) => [...errors, error.message]);
      });
  }

  function clearErrors() {
    setErrors([]);
  }

  return (
    <section className="flex-center-section auth">
      <div className="window-center-grey auth CreateGame">
        <div className="header-row">
          <img src={user.image} alt={user.username} />
          <div>@{user.username}, let's create your game! </div>
        </div>
        {errors.length > 0 && (
          <>
            {" "}
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
            <button onClick={clearErrors}>Clear Errors</button>
          </>
        )}
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
