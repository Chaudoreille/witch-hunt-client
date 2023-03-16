import React, { useState } from "react";
import "./PlayerCard.css";
import LockIcon from "@mui/icons-material/Lock";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

function PlayerCard({ player, onClick, className, votes }) {
  const [face, setFace] = useState("down");
  const [role, setRole] = useState("");

  console.log("player", player);
  return (
    <div className={`PlayerCard ${className && className}`}>
      <div className="card-wrapper">
        <div
          className="card"
          onClick={() => {
            if (!onClick) return;
            onClick();
          }}
        >
          <div className="bg back" />
          <div className={`bg front ${role}`} />
          <div className="content">
            <div className="user-info">
              <ProfilePicture user={player.user} />
              <h6>{player.user.username}</h6>
            </div>
            <div className="votes">
              {votes && (
                <div className="locked">
                  {votes.map((voter) => (
                    voter.vote.state === "Locked" && (
                      <>
                        <ProfilePicture
                          user={voter.user}
                          title={voter.user.username}
                          key={voter.user._id}
                          className={`vote`}
                        />
                        <ProfilePicture
                          user={voter.user}
                          title={voter.user.username}
                          key={voter.user._id}
                          className={`vote`}
                        />
                        <ProfilePicture
                          user={voter.user}
                          title={voter.user.username}
                          key={voter.user._id}
                          className={`vote`}
                        />
                      </>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div >
      </div>
      <div className="votes">
        <div className="cast">
          {votes && (
            votes.map((voter) => (
              voter.vote.state === "Cast" && (
                <ProfilePicture
                  user={voter.user}
                  title={voter.user.username}
                  key={voter.user._id}
                  className={`vote`}
                />
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
