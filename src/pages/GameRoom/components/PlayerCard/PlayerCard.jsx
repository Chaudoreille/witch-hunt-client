import React from "react";
import "./PlayerCard.css";
import LockIcon from "@mui/icons-material/Lock";

function PlayerCard({ player, onClick, className, votes }) {
  return (
    <div
      className={`PlayerCard ${className && className}`}
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
    >
      <img
        src={player.user.image}
        alt={player.user.username}
        title={player.user.username}
      />

      <div>{player.user.username}</div>
      {votes && (
        <div>
          {votes.map((voter) => (
            <img
              src={voter.user.image}
              title={voter.user.username}
              alt={voter.user.username}
              key={voter.user._id}
              className={`vote ${
                voter.vote.state === "Cast" ? "cast" : "locked"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
