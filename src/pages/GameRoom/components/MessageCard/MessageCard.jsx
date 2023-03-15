import React, { useContext } from "react";
import { AuthContext } from "../../../..//context/AuthContext";
import PassedTime from "../../../../components/PassedTime/PassedTime";
import "./MessageCard.css";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture"

function MessageCard({ message }) {
  const user = useContext(AuthContext);

  return (
    <div
      className={`MessageCard ${user.user._id === message.author._id ? "sent" : "received"
        }`}
    >
      <ProfilePicture user={message.author} />

      <div className="column">
        <p className="content">{message.content}</p>
        <p className="timestamp">
          <PassedTime model={message} />
        </p>
      </div>
    </div>
  );
}

export default MessageCard;
