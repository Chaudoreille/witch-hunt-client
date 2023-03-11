import React, { useEffect, useState } from "react";
import api from "../../service/service";

import GameCardList from "../../components/GameCardList/GameCardList";
import "./Lobbies.css";

function Lobbies() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api
      .getRooms()
      .then((rooms) => {
        rooms.sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        });
        rooms = rooms.map((room) => {
          const time = new Date();
          return {
            id: room._id,
            name: room.name,
            language: room.spokenLanguage,
            participants: room.state.players.length,
            totalParticipants: room.maxPlayers,
            creationTime: Math.round(
              (time - new Date(room.createdAt)) / (1000 * 60)
            ),
            link: `/lobbies/:${room._id}`,
          };
        });
        setRooms(rooms);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="Lobbies">
      {rooms.length ? (
        <GameCardList list={rooms} />
      ) : (
        <h2>
          There are currently no active lobbies. Would you like to create one?
        </h2>
      )}
    </section>
  );
}

export default Lobbies;
