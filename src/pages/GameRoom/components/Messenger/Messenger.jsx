import React, { useState, useEffect } from "react";
import "./Messenger.css";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import SendIcon from "@mui/icons-material/Send";
import api from "../../../../service/service";
import MessageCard from "../MessageCard/MessageCard";

function Messenger({ room, handleErrors }) {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [messagesLastUpdated] = useState({
    at: null,
  });

  async function loadMessages() {
    api
      .getMessages(room._id, messagesLastUpdated.at)
      .then((response) => {
        if (response.length > 0) {
          setMessages((oldMessages) => [...oldMessages, ...response]);
          messagesLastUpdated.at = response.at(-1).updatedAt;
        }
      })
      .catch((error) => {
        let errorMessage;
        if (error.response) errorMessage = error.response.data.message;
        else errorMessage = error.message;
        handleErrors(errorMessage);
      });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadMessages();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="Messenger">
      <div className="messenger-header">Village Chat for {room.name}</div>
      <div className="messenger-container">
        {messages.map((message) => (
          <MessageCard message={message} key={message._id} />
        ))}
      </div>
      <form
        className="messenger-form"
        onSubmit={(event) => {
          event.preventDefault();
          api
            .sendMessage(room._id, currentInput)
            .then((response) => {
              setCurrentInput("");
            })
            .catch((error) => {
              let errorMessage;
              if (error.response) errorMessage = error.response.data.message;
              else errorMessage = error.message;
              handleErrors(errorMessage);
            });
        }}
      >
        <Input
          value={currentInput}
          type="text"
          name="message"
          action={(event) => setCurrentInput(event.target.value)}
          placeholder={"Send a message to your village chat"}
        />
        <Button>
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}

export default Messenger;
