import React, { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import ActiveRoom from "./components/ActiveRoom/ActiveRoom";
import api from "../../service/service";

import "./GameRoom.css";
import GameCompletedroom from "./components/GameCompletedRoom/GameCompletedroom";
import Messenger from "./components/Messenger/Messenger";

function reducer(state, action) {
  if (state === null) return action;
  if (action.updatedAt > state.updatedAt) {
    console.log("update room");
    return action;
  }
  console.log("keep room");
  return state;
}

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const [room, dispatchRoom] = useReducer(reducer, null);

  const [displaySettings, setDisplaySettings] = useState(false);

  const { user } = useContext(AuthContext);

  const { roomId } = useParams();
  const navigate = useNavigate();

  if (room === null) console.log("FIRST LOAD");
  console.log("rendering game room");
  async function loadRoom() {
    api
      .getRoom(roomId)
      .then((fetchedRoom) => {
        console.log(
          "fetching room updates " + new Date().toISOString().slice(11, 19)
        );

        dispatchRoom(fetchedRoom);
      })
      .catch((error) => {
        console.error(error.message);
        alert("game room no longer exists");
        navigate("/lobbies");
      });
  }

  useEffect(() => {
    console.log("setting new interval");
    loadRoom();

    const intervalId = setInterval(() => {
      loadRoom();
    }, 1000);

    return () => {
      console.log("clearing old interval");
      clearInterval(intervalId);
    };
  }, [roomId]);

  function createGameActionHandler(action, ...parameters) {
    return () => {
      api
        .takeAction(room._id, action, parameters)
        .then((response) => {
          console.log(`${action} response`, response);
          if (action === "leave") return navigate("/lobbies");
        })
        .catch((error) => console.log(`${action} error`, error));
    };
  }

  if (!room) return <section className="GameRoom">Loading...</section>;

  const isOwner = user._id === room.owner;
  const currentPlayercount =
    room.state.status === "Lobby"
      ? room.state.players.length
      : room.state.players.filter((player) => player.status === "Alive").length;
  const maxPlayerCount =
    room.state.status === "Lobby" ? room.maxPlayers : room.state.players.length;

  return (
    <section className="GameRoom">
      <div id="game">
        {room.state.status === "Lobby" && (
          <WaitingRoom
            room={room}
            createGameActionHandler={createGameActionHandler}
            displaySettings={displaySettings}
            setDisplaySettings={setDisplaySettings}
          />
        )}
        {room.state.status === "Started" && (
          <ActiveRoom
            room={room}
            createGameActionHandler={createGameActionHandler}
            displaySettings={displaySettings}
            setDisplaySettings={setDisplaySettings}
          />
        )}
        {room.state.status === "Completed" && (
          <GameCompletedroom
            room={room}
            createGameActionHandler={createGameActionHandler}
            displaySettings={displaySettings}
            setDisplaySettings={setDisplaySettings}
          />
        )}
      </div>
      <div id="messenger">
        <Messenger room={room} />
      </div>
    </section>
  );
}

export default GameRoom;
