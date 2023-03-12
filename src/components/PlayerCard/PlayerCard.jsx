import React from "react";
import "./PlayerCard.css";

function PlayerCard({ player, onClick }) {
  return (
    <div
      className="PlayerCard"
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
    >
      <img src={player.user.image} alt={player.user.username} />

      <div>{player.user.username}</div>
    </div>
  );
}

export default PlayerCard;
