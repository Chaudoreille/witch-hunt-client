import React, { useReducer, useContext } from "react";
import api from "../../service/service";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          action={(event) => dispatchRoom({ name: event.target.value })}
          type="text"
          placeholder="Name of the room"
          value={room.name}
          label="Name"
        />
        <Input
          name="maxPlayers"
          type="number"
          value={room.maxPlayers}
          label="Players"
          action={(event) => dispatchRoom({ maxPlayers: event.target.value })}
        />
        <Input
          name="isPublished"
          type="checkbox"
          value={room.isPublished}
          label="Visibility"
          action={(event) =>
            dispatchRoom({ isPublished: event.target.checked })
          }
        />
        <Input
          name="spokenLanguage"
          type="text"
          placeholder="Spoken language"
          value={room.spokenLanguage}
          label="Language"
          action={(event) =>
            dispatchRoom({ spokenLanguage: event.target.value })
          }
        />
        <Button variant="primary">Create</Button>
      </form>
    </section>
  );
}

export default CreateGame;
