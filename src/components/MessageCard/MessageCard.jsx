import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
      <p>{message.content}</p>
    </div>
  );
}

export default MessageCard;
