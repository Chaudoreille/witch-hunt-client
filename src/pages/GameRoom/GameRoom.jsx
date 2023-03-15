import React, { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import ActiveRoom from "./components/ActiveRoom/ActiveRoom";
import ErrorList from "../../components/ErrorList/ErrorList";
import Loader from "../../components/Loader/Loader";
import io from 'socket.io-client';

import "./GameRoom.css";
import GameCompletedroom from "./components/GameCompletedRoom/GameCompletedroom";
import Messenger from "./components/Messenger/Messenger";

/**
 * Adds errorMessage to the list of errors.
 * Handing it null instead of a String will
 * reset the error list to an empty list
 * @param {Array} existingErrors
 * @param {String} errorMessage
 * @returns
 */
function errorReducer(existingErrors, errorMessage) {
  if (errorMessage === null) return [];

  if (!existingErrors.includes(errorMessage))
    return [...existingErrors, errorMessage];
  return existingErrors;
}

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const [room, setRoom] = useState(null);
  const [errors, dispatchErrors] = useReducer(errorReducer, []);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const { user, token } = useContext(AuthContext);

  const { roomId } = useParams();
  const navigate = useNavigate();

  /**
   * Create Socket for real-time communication
   */
  useEffect(() => {
    const ioSocket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: token,
      },
      query: {
        game: roomId,
      },
    });

    ioSocket.on("connect_error", (error) => {
      dispatchErrors(error.message);
      navigate("/home");
    });

    ioSocket.on("initialize-messages", (messages) => {
      setMessages(messages);
    });

    ioSocket.on("message", (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });

    ioSocket.on("update-room", (room) => {
      setRoom(room);
    });

    ioSocket.on("deleted-room", (message) => {
      dispatchErrors(message);
      setRoom(null);
    });

    ioSocket.on("error", (errorMessage) => {
      dispatchErrors(errorMessage);
    });

    setSocket(ioSocket);

    return () => {
      ioSocket.emit("end");
    };
  }, [roomId]);

  function sendMessage(message) {
    socket.emit("message", message);
  }

  function socketErrorHandler(error) {
    if (error) {
      dispatchErrors(error);
    }
  }
  /**
   * Creates a function that will contact the backend to execute the specified action
   * with the specified parameters (if any). Returns a promise that resolves to the
   * returned data, or rejects to the error message.
   * Will also add the error message to the error list
   * @param {String} action
   * @param  {Array} parameters - optional
   * @param {Function} callback - optional
   * @returns
   */
  function createGameActionHandler(
    action,
    parameters = [],
    callback = socketErrorHandler
  ) {
    return () => {
      socket.emit("game-action", action, parameters, callback);
    };
  }

  return (
    <section className="GameRoom">
      {errors.length > 0 && (
        <ErrorList messages={errors} closeAction={() => {
          if (!room) {
            navigate('/home');
          } else {
            dispatchErrors(null);
          }
        }} />
      )}
      {!room ? (<Loader />) : (
        <>
          <div id="game">
            {room.state.status === "Lobby" && (
              <WaitingRoom
                room={room}
                createGameActionHandler={createGameActionHandler}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                dispatchErrors={dispatchErrors}
                socket={socket}
              />
            )}
            {room.state.status === "Started" && (
              <ActiveRoom
                room={room}
                createGameActionHandler={createGameActionHandler}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
              />
            )}
            {room.state.status === "Completed" && (
              <GameCompletedroom
                room={room}
                createGameActionHandler={createGameActionHandler}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
              />
            )}
          </div>
          <div id="messenger">
            <Messenger
              room={room}
              sendMessage={sendMessage}
              handleErrors={dispatchErrors}
              messages={messages} />
          </div>
        </>
      )}
    </section>
  );
}

export default GameRoom;
