import React, { useEffect, useState, useContext, useCallback } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import "./Lobbies.css";

import debounce from "../../utils/debounce";
import GameCardList from "../../components/GameCardList/GameCardList";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ButtonLink from "../../components/Button/ButtonLink";
import ErrorList from "../../components/ErrorList/ErrorList";

function Lobbies() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState([]);

  function handleFilter(event) {
    const { name } = event.target;
    setFilters(oldFilters => ({ ...oldFilters, [name]: event.target.value }));
  }

  const toggleOwner = useCallback(() => {
    setFilters(oldFilters => {
      if (oldFilters.hasOwnProperty("owner")) {
        const { owner, ...newFilters } = oldFilters;
        return newFilters;
      } else {
        return { ...oldFilters, owner: user._id };
      }
    });
  }, []);

  const queryRooms = (query) => {
    setErrors([]);
    api
      .getRooms(query)
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => setErrors([error]));
  };

  // we debounce the query call to avoid unnecessary calls on filter changes
  // debounce returns a new function on each call. 
  // useCallback ensures function is created only once
  const optimizedQuery = useCallback(debounce(queryRooms, 400), []);

  useEffect(() => optimizedQuery(filters), [filters]);

  return (
    <section className="Lobbies">
      <div className="actionBar">
        <ButtonLink variant={"primary"} link={"/games/join"}>
          Join game
        </ButtonLink>
        <ButtonLink variant={"primary"} link={"/games/create"}>
          Create a game
        </ButtonLink>
      </div>
      <div className="filters">
        <Button variant={"primary"} action={toggleOwner}>
          {filters.owner ? "All Games" : "My Games"}
        </Button>
        <Input
          type="text"
          name="spokenLanguage"
          placeholder="Spoken language"
          action={handleFilter}
          value={filters.spokenLanguage || ""}
        />
        <Input
          type="text"
          name="name"
          placeholder="Game name"
          action={handleFilter}
          value={filters.name || ""}
        />
      </div>
      {!errors.length ||
        <ErrorList messages={errors} />
      }
      {rooms.length ? (
        <GameCardList list={rooms} displayLink={true} />
      ) : (
        <h2>
          No active lobbies match your current filters.
        </h2>
      )}
    </section>
  );
}

export default Lobbies;
