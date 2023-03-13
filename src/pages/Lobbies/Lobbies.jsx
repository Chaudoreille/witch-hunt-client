import React, { useEffect, useState } from "react";
import api from "../../service/service";

import GameCardList from "../../components/GameCardList/GameCardList";
import "./Lobbies.css";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import ButtonLink from "../../components/Button/ButtonLink";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

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
          <div className="actionBar">
            <ButtonLink variant={"primary"} link={"/lobbies/join"}>
              Join game
            </ButtonLink>
            <ButtonLink variant={"primary"} link={"/lobbies/join"}>
              My Games
            </ButtonLink>
            <ButtonLink variant={"primary"} link={"/lobbies/create"}>
              Create a game
            </ButtonLink>
          </div>
          <div className="filters">
            <Input
              type="text"
              name="search"
              placeholder="Spoken language"
              action={handleFilter}
              value={filter}
            />
          </div>
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
