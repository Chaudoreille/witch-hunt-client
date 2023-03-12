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
  const [roomLastUpdated, setRoomLastUpdated] = useState({
    at: "never",
  });

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
