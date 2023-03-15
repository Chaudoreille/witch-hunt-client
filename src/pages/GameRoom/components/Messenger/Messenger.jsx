import React, { useState } from "react";
import "./Messenger.css";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import MessageCard from "../MessageCard/MessageCard";

function Messenger({ room, handleErrors, sendMessage, messages }) {
  const [currentInput, setCurrentInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const message = { content: currentInput };
    sendMessage(message);
    setCurrentInput("");
  }

  return (
    <div className="Messenger">
      <div className="messenger-header">
        <p>Village Chat for {room.name}</p>
      </div>
      <div className="messenger-container">
        {messages.map((message) => (
          <MessageCard message={message} key={message._id} />
        ))}
      </div>
      <form
        className="messenger-form"
        onSubmit={handleSubmit}
      >
        <Input
          value={currentInput}
          type="text"
          name="message"
          action={(event) => setCurrentInput(event.target.value)}
          placeholder={"Send a message to your village"}
        />
        <Button>
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}

export default Messenger;
