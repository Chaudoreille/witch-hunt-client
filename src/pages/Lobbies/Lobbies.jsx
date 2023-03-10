import React, { useEffect, useState } from "react";
import api from "../../service/service";

import GameCardList from "../../components/GameCardList/GameCardList";
import "./Lobbies.css";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";

function Lobbies() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("");

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

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  const filteredRooms = filter
    ? rooms.filter((room) =>
        room.spokenLanguage.toLowerCase().includes(filter.toLowerCase())
      )
    : rooms;

  return (
    <section className="Lobbies">
      {rooms.length ? (
        <>
          <Input
            type="text"
            name="search"
            label="Spoken language"
            action={handleFilter}
            value={filter}
          />
          <GameCardList list={filteredRooms} displayLink={true} />
        </>
      ) : (
        <h2>
          There are currently no active lobbies matching your current filter.
          <Link to="/lobbies/create">Would you like to create one?</Link>
        </h2>
      )}
    </section>
  );
}

export default Lobbies;