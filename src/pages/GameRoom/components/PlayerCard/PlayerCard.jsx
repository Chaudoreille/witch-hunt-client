import React from "react";
import "./PlayerCard.css";
import LockIcon from "@mui/icons-material/Lock";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

function PlayerCard({ player, onClick, className, votes }) {
  return (
    <div
      className={`PlayerCard ${className && className}`}
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
    >
      <ProfilePicture user={player.user} />

      <h6>{player.user.username}</h6>
      {votes && (
        <div>
          {votes.map((voter) => (
            <img
              src={voter.user.image}
              title={voter.user.username}
              alt={voter.user.username}
              key={voter.user._id}
              className={`vote ${voter.vote.state === "Cast" ? "cast" : "locked"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
