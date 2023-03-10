import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import WaitingRoom from "../../components/WaitingRoom/WaitingRoom";
import ActiveRoom from "../../components/ActiveRoom/ActiveRoom";
import api from "../../service/service";

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const navigate = useNavigate();

  async function loadRoom() {
    api
      .getRoom(roomId)
      .then((room) => {
        setRoom(room);
      })
      .catch((error) => {
        console.error(error.message);
        alert("game room no longer exists");
        navigate("/lobbies");
      });
  }

  useEffect(() => {
    loadRoom();

    const intervalId = setInterval(() => {
      loadRoom();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [roomId]);

  function createGameActionHandler(action) {
    return () => {
      api
        .takeAction(room._id, action)
        .then((response) => console.log(`${action} response`, response))
        .catch((error) => console.log(`${action} error`, error));
    };
  }

  if (!room) return <section className="GameRoom">Loading...</section>;

  return (
    <section className="GameRoom">
      {room.state.status === "Lobby" ? (
        <WaitingRoom
          room={room}
          createGameActionHandler={createGameActionHandler}
        />
      ) : (
        <ActiveRoom
          room={room}
          createGameActionHandler={createGameActionHandler}
        />
      )}
    </section>
  );
}

export default GameRoom;