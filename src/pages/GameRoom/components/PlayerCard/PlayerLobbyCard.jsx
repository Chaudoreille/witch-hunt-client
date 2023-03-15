import React from "react";
import "./PlayerCard.css";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

function PlayerLobbyCard({ player, className }) {
  return (
    <div
      className={`PlayerLobbyCard ${className || ""}`}>
      <ProfilePicture user={player.user} />
      <h6>{player.user.username}</h6>
    </div>
  );
}

export default PlayerLobbyCard;
