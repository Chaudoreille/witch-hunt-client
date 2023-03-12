import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import ActiveRoom from "../../components/ActiveRoom/ActiveRoom";
import api from "../../service/service";

import "./GameRoom.css";
import GameCompletedroom from "../../components/GameCompletedRoom/GameCompletedroom";

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const [room, setRoom] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(false);
  // The below state is used specifically without using the setter
  // we just need a reference object that we can update without the reference changing
  // so that we can access the current value from the loadroom function which
  // has its values set in stone on interval creation
  const [roomLastUpdated] = useState({
    at: "never",
  });
  const { user } = useContext(AuthContext);

  const { roomId } = useParams();
  const navigate = useNavigate();

  if (room === null) console.log("FIRST LOAD");

  async function loadRoom() {
    api
      .getRoom(roomId)
      .then((fetchedRoom) => {
        console.log(
          "fetching room updates " + new Date().toISOString().slice(11, 19)
        );

        if (fetchedRoom.updatedAt !== roomLastUpdated.at) {
          console.log("SETTING NEW ROOM");
          console.log(
            "previously last updated at",
            roomLastUpdated.at,
            "new updatedate",
            fetchedRoom.updatedAt
          );
          setRoom(fetchedRoom);
          roomLastUpdated.at = fetchedRoom.updatedAt;
        }
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
        .then((response) => console.log(`${action} response`, response))
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
      {room.state.status === "Lobby" && (
        <WaitingRoom
          room={room}
          createGameActionHandler={createGameActionHandler}
          displaySettings={displaySettings}
        />
      )}
      {room.state.status === "Started" && (
        <ActiveRoom
          room={room}
          createGameActionHandler={createGameActionHandler}
          displaySettings={displaySettings}
        />
      )}
      {room.state.status === "Completed" && (
        <GameCompletedroom
          room={room}
          createGameActionHandler={createGameActionHandler}
          displaySettings={displaySettings}
        />
      )}
    </section>
  );
}

export default GameRoom;
