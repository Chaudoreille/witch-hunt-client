import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./PlayerCard.css";
import LockIcon from "@mui/icons-material/Lock";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";


function PlayerCard({ player, onClick, className, votes }) {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("alive");
  const [role, setRole] = useState("hidden");

  useEffect(() => {
    console.log(player);
    console.log(player.user._id === user._id, player.status === "Dead");
    console.log(role);

    if (role === "hidden" &&
      (player.user._id === user._id ||
        player.status === "Dead")) {
      setRole(player.role.toLowerCase());
    }
    if (player.status.toLowerCase() !== status) {
      setStatus(player.status.toLowerCase());
    }
  }, [player]);

  return (
    <div className={`PlayerCard ${className && className}`}>
      <div className="user-info">
        <ProfilePicture user={player.user} />
        <h6>{player.user.username}</h6>
      </div>
      <div className="card-wrapper">
        <div
          className="card"
          onClick={() => {
            if (!onClick) return;
            onClick();
          }}
        >
          <div className={`bg ${status} ${role}`} />
          <div className="content">
            <div className="votes">
              {votes && (
                <>
                  <div className="locked">
                    {votes.map((voter) => (
                      voter.vote.state === "Locked" && (
                        <ProfilePicture
                          key={`PlayerCard-vote-${voter.user._id}`}
                          user={voter.user}
                          title={voter.user.username}
                          className={`vote`}
                        />
                      )
                    ))}
                  </div>
                  <div className="cast">
                    {votes && (
                      votes.map((voter) => (
                        voter.vote.state === "Cast" && (
                          <ProfilePicture
                            key={`PlayerCard-vote-${voter.user._id}`}
                            user={voter.user}
                            title={voter.user.username}
                            className={`vote`}
                          />
                        )
                      ))
                    )}
                  </div>
                </>

              )}
            </div>
          </div>
        </div >
      </div>
    </div >
  );
}

export default PlayerCard;
