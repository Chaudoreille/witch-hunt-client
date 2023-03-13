import React from "react";
import ButtonLink from "../../components/Button/ButtonLink";

import "./Home.css";

function Home() {
  return (
    <section className="flex-center-section auth">
      <div className="window-center-grey auth">
        <ButtonLink variant={"primary"} link={"/lobbies/create"}>
          Create a game
        </ButtonLink>
        <ButtonLink variant={"secondary"} link={"/lobbies"}>
          Find a game
        </ButtonLink>
        <ButtonLink variant={"secondary"} link={"/lobbies/private"}>
          Join a private game
        </ButtonLink>
      </div>
    </section>
  );
}

export default Home;
