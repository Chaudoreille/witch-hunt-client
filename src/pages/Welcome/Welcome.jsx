import React, { useState, useEffect } from "react";
import ButtonLink from "../../components/Button/ButtonLink";
import GameCardList from "../../components/GameCardList/GameCardList";
import api from "../../service/service";
import "./Welcome.css";

function Welcome() {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    api
      .getRooms()
      .then((rooms) => {
        rooms.sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt);
        });
        rooms = rooms.slice(0, 10);
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
          };
        });
        setRooms(rooms);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!rooms) return <div>Loading</div>;

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
