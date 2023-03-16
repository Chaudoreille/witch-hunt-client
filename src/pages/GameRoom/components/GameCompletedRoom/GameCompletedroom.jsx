import React, { useState, useContext } from "react";
import api from "../../../../service/service";
import "./GameCompleted.css";
import ButtonLink from "../../../../components/Button/ButtonLink";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

/**
 * GameCompletedroom
 * This component will display the end of game result page.
 * @returns JSX.Element
 */
function GameCompletedroom({ room, winners }) {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  setTimeout(() => {
    setShow(true);
  }, 1500);

  function thatsAllFolks() {
    api.deleteRoom(room._id)
      .then(() => navigate('/home'))
      .catch(error => {
        console.error(error);
        navigate('/home');
      });
  }

  return (
    <section className={`GameCompletedRoom ${show ? "show" : ""}`}>
      <div className="game-over">
        <img src="/images/witch-run_logo.png" alt="logo" />
        <h2>The {winners} won !</h2>
        <ButtonLink link="/home" className="new-game" variant="small">New game</ButtonLink>
        {room.owner === user._id && (
          <Button variant="small" className="new-game" action={thatsAllFolks}>Delete Room</Button>
        )}
      </div>
    </section>
  );
}

export default GameCompletedroom;
