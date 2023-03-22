import React, { useEffect, useState, useContext, useCallback } from "react";
import api from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import "./Lobbies.css";

import debounce from "../../utils/debounce";
import GameCardList from "../../components/GameCardList/GameCardList";
import Input from "../../components/Input/Input";
import ButtonLink from "../../components/Button/ButtonLink";
import ErrorList from "../../components/ErrorList/ErrorList";
import Toggle from "../../components/Toggle/Toggle";
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../../components/Loader/Loader";



function Lobbies() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState(null);
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState([]);

  function handleFilter(event) {
    const { name, value } = event.target;
    setFilters((oldFilters) => ({ ...oldFilters, [name]: value }));
  }

  const toggleOwner = useCallback(() => {
    setFilters((oldFilters) => {
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
      <div className="commandsBar">
        <div className="actionBar">
          <ButtonLink variant={"primary"} link={"/games/join"}>
            Join a private game
          </ButtonLink>
          <ButtonLink variant={"primary"} link={"/games/create"}>
            Create a game
          </ButtonLink>
        </div>
        <div className="filters">

          <Input
            type="text"
            name="spokenLanguage"
            placeholder="Search by language"
            action={handleFilter}
            value={filters.spokenLanguage || ""}
            icon={<SearchIcon />}
          />
          <Input
            type="text"
            name="name"
            placeholder="Search by name"
            action={handleFilter}
            value={filters.name || ""}
            icon={<SearchIcon />}
          />

          <Toggle toggle={filters.owner || false} optionLeft="My rooms" optionRight="All rooms"
            onChangeLeft={(event) => toggleOwner(event.target.checked)}
            onChangeRight={(event) => toggleOwner(!event.target.checked)}
          />

        </div>
      </div>
      {!errors.length || <ErrorList messages={errors} />}
      {!rooms ? (
        <Loader />
      ) : rooms.length ? (
        <GameCardList list={rooms} displayLink={true} />
      ) : (
        <div className="window-grey">
          <img src="/images/empty-state-search.png" />
          <h2>Sorry, we couldn't find any match !</h2>
        </div>
      )}
    </section>
  );
}

export default Lobbies;
