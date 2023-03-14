import React, { useState, useEffect } from "react";
import ButtonLink from "../../components/Button/ButtonLink";
import GameCardList from "../../components/GameCardList/GameCardList";
import api from "../../service/service";
import "./Welcome.css";

function Welcome() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api
      .getRooms()
      .then((rooms) => {
        // TODO We probably will want to move the sorting and the slicing/limit to the route
        rooms.sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        });
        rooms = rooms.slice(0, 10);
        setRooms(rooms);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="Welcome">
      <div className="left">
        <img src="images/witch-run_logo.png" />
        <div className="buttons">
          <ButtonLink variant={"primary"} link={"/login"}>
            Login
          </ButtonLink>
          <ButtonLink variant={"secondary"} link={"/signup"}>
            Signup
          </ButtonLink>
        </div>
      </div>
      <div className="right">
        <GameCardList list={rooms} />
      </div>
    </section>
  );
}

export default Welcome;
