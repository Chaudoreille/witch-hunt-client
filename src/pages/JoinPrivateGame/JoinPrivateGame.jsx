import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./JoinPrivateGame.css";
import api from "../../service/service";
import { useNavigate } from "react-router-dom";

function JoinPrivateGame() {
  const [pin, setPin] = useState("");

  function handleInputChange(event) {
    setPin(event.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (pin.length !== 6) {
      // TODO display error message about invalid pin length
      alert("invalid pin length");
      return;
    }

    api
      .getRooms({ pin: pin })
      .then((room) => {
        const roomId = room._id;
        navigate(`/lobbies/${roomId}`);
      })
      .catch((error) => {
        // TODO error message display
        alert(error.message);
      });
  }

  return (
    <section className="JoinPrivateGame">
      <div className="column">
        <form>
          <Input
            type="text"
            name="pin"
            action={handleInputChange}
            label="Pin"
            value={pin}
            placeholder="Insert pin"
          />
          <Button type="submit" variant={"primary"} action={handleSubmit}>
            Join
          </Button>
        </form>
      </div>
    </section>
  );
}

export default JoinPrivateGame;
