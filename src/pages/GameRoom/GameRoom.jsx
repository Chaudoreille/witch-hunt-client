import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    api
      .getRoom(roomId)
      .then((room) => {
        setRoom(room);
      })
      .catch((error) => alert(error.message));

    const intervalId = setInterval(() => {
      api
        .getRoom(roomId)
        .then((room) => {
          console.log("updating room");
          setRoom(room);
        })
        .catch((error) => alert(error.message));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [roomId]);

  if (!room) return <section className="GameRoom">Loading...</section>;

  return (
    <section className="GameRoom">
      {room.state.status === "Lobby" ? (
        <WaitingRoom room={room} />
      ) : (
        <ActiveRoom room={room} />
      )}
    </section>
  );
}

export default GameRoom;
