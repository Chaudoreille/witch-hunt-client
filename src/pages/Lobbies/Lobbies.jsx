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
        // TODO We probably will want to move the sorting to the route
        rooms.sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        });
        setRooms(rooms);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="Lobbies">
      {rooms.length ? (
        <GameCardList list={rooms} displayLink={true} />
      ) : (
        <h2>
          There are currently no active lobbies. Would you like to create one?
        </h2>
      )}
    </section>
  );
}

export default Lobbies;
