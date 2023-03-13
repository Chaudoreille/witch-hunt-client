import React, { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import ActiveRoom from "./components/ActiveRoom/ActiveRoom";
import api from "../../service/service";
import ErrorList from "../../components/ErrorList/ErrorList";

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

function errorReducer(state, action) {
  console.log("running error reducer");
  if (action === null) return [];
  console.log("trying to add error", action, "to", state);
  if (!state.includes(action)) return [...state, action];
  return state;
}

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const [room, dispatchRoom] = useReducer(reducer, null);
  const [errors, dispatchErrors] = useReducer(errorReducer, []);
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
        const errorMessage = "Unable to load room data";

        dispatchErrors(errorMessage);
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

  /**
   * Creates a function that will contact the backend to execute the specified action
   * with the specified parameters (if any). Returns a promise that resolves to the
   * returned data, or rejects to the error message.
   * Will also add the error message to the error list
   * @param {String} action
   * @param  {...any} parameters
   * @returns
   */
  function createGameActionHandler(action, ...parameters) {
    return async () => {
      return api
        .takeAction(room._id, action, parameters)
        .then((response) => {
          console.log(`${action} response`, response);
        })
        .catch((error) => {
          let errorMessage;
          if (error.response) errorMessage = error.response.data.message;
          else errorMessage = error.message;
          dispatchErrors(errorMessage);
          throw new Error("returning action error");
        });
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
      {errors.length > 0 && (
        <ErrorList messages={errors} closeAction={() => dispatchErrors(null)} />
      )}
      <div className="row">
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
      </div>
    </section>
  );
}

export default GameRoom;
