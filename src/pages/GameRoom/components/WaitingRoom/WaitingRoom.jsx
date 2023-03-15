import { useContext, useState, useReducer } from "react";
import "./WaitingRoom.css";
import PlayerCard from "../PlayerCard/PlayerCard";
import { AuthContext } from "../../../../context/AuthContext";
import Button from "../../../../components/Button/Button";
import api from "../../../../service/service";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import GameRoomForm from "../../../../components/GameRoomForm/GameRoomForm";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import ActionsBar from "../ActionsBar/ActionsBar";

function reducer(state, action) {
  return { ...state, ...action };
}

function WaitingRoom({
  room,
  createGameActionHandler,
  displaySettings,
  setDisplaySettings,
  dispatchErrors,
  socket,
}) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [roomEditFormValues, dispatchRoomEditFormValues] = useReducer(
    reducer,
    room
  );
  const navigate = useNavigate();
  const isOwner = user._id === room.owner;
  const isSignedUp = room.state.players.some(
    (player) => player.user._id === user._id
  );
  function handleSubmit(event) {
    event.preventDefault();
    api
      .updateRoom(room._id, roomEditFormValues)
      .then(() => {
        setDisplaySettings(false);
        socket.emit("force-update");
      })
      .catch((error) => dispatchErrors(error.message));
  }

  const handleClickToOpen = () => {
    setOpen(true);
  };


  return (
    <div className="WaitingRoom">



      <div className="waiting-section">
        <div className="room-header">
          {isOwner && (
            <SettingsOutlinedIcon
              className="clickable-icon"
              onClick={() => {
                setDisplaySettings(!displaySettings);
                handleClickToOpen();
              }}
            />
          )}
          <div className="room-info">
            <h2>{room.name}</h2>
            <h4>({room.spokenLanguage})</h4>
          </div>
          <div className="row">
            <PermIdentityIcon className="icon-user" />
            {room.state.players.length}/{room.maxPlayers}

            <ActionsBar >
              {isOwner ? (
                <>
                  <h2 className="game-pin">
                    Pin {room.pin}
                    &nbsp;
                    <FilterNoneOutlinedIcon
                      className="clickable-icon"
                      onClick={() => navigator.clipboard.writeText(room.pin)}
                    />
                  </h2>
                  <Button
                    variant="primary"
                    action={createGameActionHandler("start")}
                  >
                    Start Game
                  </Button>
                </>
              )
                :
                (<>
                  {isSignedUp ? (
                    <Button
                      variant="primary"
                      action={createGameActionHandler("leave", [], (error) => {
                        if (error) {
                          dispatchErrors(error);
                        } else {
                          navigate("/home");
                        }
                      })}
                    >
                      Leave Game
                    </Button>
                  ) : (

                    <Button
                      variant="primary"
                      action={createGameActionHandler("join")}
                    >
                      Join Game
                    </Button>

                  )}
                </>)
              }

            </ActionsBar>
          </div>
        </div>
        <div className="playerlist">
          {room.state.players.map((player) => (
            <PlayerCard key={player.user._id} player={player} />
          ))}
        </div>
      </div>
      {displaySettings && (
        <>
          <dialog className="owner-options" open={open}>
            <GameRoomForm
              handleSubmit={handleSubmit}
              room={roomEditFormValues}
              submitButtonLabel="Edit Room Settings"
              dispatchRoomChanges={dispatchRoomEditFormValues}
            />
            <Button variant="secondary" action={() => {
              socket.emit("delete-room", () => {
                api.deleteRoom(room._id);
                navigate("/home");
              });
            }}>
              Delete Room
            </Button>
          </dialog>
        </>
      )}
    </div>
  );
}

export default WaitingRoom;
