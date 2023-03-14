import React, { useContext } from "react";
import { AuthContext } from "../../../..//context/AuthContext";
import PassedTime from "../../../../components/PassedTime/PassedTime";
import "./MessageCard.css";

function MessageCard({ message }) {
  const user = useContext(AuthContext);

  return (
    <div
      className={`MessageCard ${
        user.user._id === message.author._id ? "sent" : "received"
      }`}
    >
      <img
        src={message.author.image}
        alt={message.author.username}
        title={message.author.username}
      />
      <div className="column">
        <p classname="content">{message.content}</p>
        <p className="timestamp">
          <PassedTime model={message} />
        </p>
      </div>
    </div>
  );
}

export default MessageCard;
