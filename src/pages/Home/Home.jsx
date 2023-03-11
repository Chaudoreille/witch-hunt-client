import React from "react";
import ButtonLink from "../../components/Button/ButtonLink";

import "./Home.css";

function Home() {
  return (
    <section className="Home">
      <div className="column">
        {" "}
        <ButtonLink variant={"primary"} link={"/lobbies/create"}>
          CREATE A GAME
        </ButtonLink>
        <ButtonLink variant={"secondary"} link={"/lobbies"}>
          FIND A GAME
        </ButtonLink>
        <ButtonLink variant={"secondary"} link={"/lobbies/private"}>
          JOIN A GAME PRIVATE GAME
        </ButtonLink>
      </div>
    </section>
  );
}

export default Home;
