import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./MessageCard.css";

function MessageCard({ message }) {
  const user = useContext(AuthContext);
  const creationTime = Math.round(
    (new Date() - new Date(message.createdAt)) / (1000 * 60)
  );
  console.log(creationTime)

  return (
    <div
      className={`MessageCard ${user.user._id === message.author._id ? "sent" : "received"
        }`}
    >
      <img
        src={message.author.image}
        alt={message.author.username}
        title={message.author.username}
      />
      <p>{message.content}</p>
      <p>{creationTime} min ago</p>
    </div>
  );
}

export default MessageCard;
