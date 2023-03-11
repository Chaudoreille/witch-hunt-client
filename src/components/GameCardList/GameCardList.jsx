import React from "react";
import GameCard from "../GameCard/GameCard";
import "./GameCardList.css";

function GameCardList({ list }) {
  return (
    <ul className="GameCardList">
      {list.map((card) => {
        return (
          <li key={card.id}>
            <GameCard
              name={card.name}
              language={card.language}
              participants={card.participants}
              totalParticipants={card.totalParticipants}
              creationTime={card.creationTime}
              link={card.link}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default GameCardList;
