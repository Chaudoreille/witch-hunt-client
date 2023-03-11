import React from "react";
import "./PlayerCard.css";

function PlayerCard({ player }) {
  return (
    <div className="PlayerCard">
      <img src={player.user.image} alt={player.user.username} />

      <div>{player.user.username}</div>
    </div>
  );
}

export default PlayerCard;
