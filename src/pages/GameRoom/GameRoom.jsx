import React, { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import ActiveRoom from "./components/ActiveRoom/ActiveRoom";
import ErrorList from "../../components/ErrorList/ErrorList";
import Storytime from "./components/Storytime/Storytime";
import Loader from "../../components/Loader/Loader";
import io from "socket.io-client";

import "./GameRoom.css";
import GameCompletedroom from "./components/GameCompletedRoom/GameCompletedroom";
import Messenger from "./components/Messenger/Messenger";
import { SoundManagerContext } from "../../context/SoundManagerContext";

/**
 * Will get the room data and then display either the active gameroom or the waiting room, depending on
 * the current state of the game
 */
function GameRoom() {
  const { playSoundEffect, stopMusic } = useContext(SoundManagerContext);
  const [room, setRoom] = useState(null);
  const [errors, dispatchErrors] = useReducer(
    (existingErrors, errorMessage) => {
      if (errorMessage === null) return [];

      playSoundEffect("error");
      if (!existingErrors.includes(errorMessage))
        return [...existingErrors, errorMessage];
      return existingErrors;
    },
    []
  );
  const [story, dispatchStory] = useState(null);
  const [time, dispatchTime] = useState("Daytime");
  const [displaySettings, setDisplaySettings] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messengerVisibility, setMessengerVisibility] = useState(false);
  const [winners, setWinners] = useState("");
  const [killedWitches, setKilledWitches] = useState(0);

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
      if (message.author._id === user._id) {
        playSoundEffect("messageSent");
      } else {
        playSoundEffect("messageReceived");
      }
    });

    ioSocket.on("update-room", (room) => {
      setRoom(room);
      dispatchStory(room.state.storytime);
      dispatchTime(room.state.mode);
      setWinners(room.state.winners);
      setKilledWitches(killed);
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

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

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

  /*background image based on room active or not + day or night*/
  let background = "";
  function bgImage() {
    if (room) {
      if (room.state.status === "Lobby") {
        background = `url("/images/village-gradient.png")`;
      } else {
        background =
          room.state.mode === "Daytime"
            ? `url("/images/day.png")`
            : `url("/images/night.png")`;
      }
    }
    return background;
  }

  /*Counting witches killed / total witches*/
  const totalWitches = Math.floor((room?.state.players.length - 3) / 4 + 1);
  const killed = room?.state.players.filter(
    (player) => player.status === "Dead" && player.role === "Witch"
  ).length;

  return (
    <section
      className="GameRoom"
      style={{
        backgroundImage: bgImage(),
      }}
    >
      <div className="message-boxes">
        {errors.length > 0 && (
          <ErrorList
            messages={errors}
            closeAction={() => {
              if (!room) {
                navigate("/home");
              } else {
                dispatchErrors(null);
              }
            }}
          />
        )}
        {room && story && (
          <Storytime story={story} time={time} status={room.state.status} />
        )}
      </div>
      {!room ? (
        <Loader />
      ) : (
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
            {(room.state.status === "Started" ||
              room.state.status === "Completed") && (
              <ActiveRoom
                totalWitches={totalWitches}
                killedWitches={killed}
                room={room}
                createGameActionHandler={createGameActionHandler}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                dispatchErrors={dispatchErrors}
              />
            )}
            {room.state.status === "Completed" && (
              <GameCompletedroom
                room={room}
                createGameActionHandler={createGameActionHandler}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                winners={winners}
              />
            )}
          </div>
          <div id="messenger">
            <Messenger
              room={room}
              className={messengerVisibility ? "visible" : "hidden"}
              sendMessage={sendMessage}
              messages={messages}
              setVisibility={setMessengerVisibility}
              chat={messengerVisibility}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default GameRoom;
