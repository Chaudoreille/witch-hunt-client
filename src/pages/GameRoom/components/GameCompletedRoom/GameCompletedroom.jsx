import React, { useState } from "react";
import "./GameCompleted.css";
import ButtonLink from "../../../../components/Button/ButtonLink";
/**
 * GameCompletedroom
 * This component will display the end of game result page.
 * @returns JSX.Element
 */
function GameCompletedroom({ winners }) {
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 1500);

  return (
    <section className={`GameCompletedRoom ${show ? "show" : ""}`}>
      <div className="game-over">
        <img src="/images/witch-run_logo.png" alt="logo" />
        <h2>The {winners} won !</h2>
        <ButtonLink link="/home" className="new-game" variant="small">New game</ButtonLink>
      </div>
    </section>
  );
}

export default GameCompletedroom;
