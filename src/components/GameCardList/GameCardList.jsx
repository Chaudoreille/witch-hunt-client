import React from "react";
import GameCard from "../GameCard/GameCard";
import "./GameCardList.css";

function GameCardList({ list, displayLink }) {
  return (
    <ul className="GameCardList">
      {list.map((game) => {
        return (
          <li key={game._id}>
            <GameCard game={game} displayLink={displayLink} />
          </li>
        );
      })}
    </ul>
  );
}

export default GameCardList;
