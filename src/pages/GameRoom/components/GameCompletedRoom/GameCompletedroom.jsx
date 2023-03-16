import React from "react";
import { Link } from "react-router-dom";
import "./GameCompleted.css";

/**
 * GameCompletedroom
 * This component will display the end of game result page.
 * @returns JSX.Element
 */
function GameCompletedroom() {
  return (
    <div className="GameCompletedRoom">
      <h2>Game Over Man, Game Over</h2>
      <Link to="/home">Back to Lobbies</Link>
    </div>
  );
}

export default GameCompletedroom;
