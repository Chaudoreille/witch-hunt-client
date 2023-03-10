import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./JoinPrivateGame.css";
import api from "../../service/service";
import { useNavigate } from "react-router-dom";
import ErrorList from "../../components/ErrorList/ErrorList";

function JoinPrivateGame() {
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState([]);
  function handleInputChange(event) {
    setPin(event.target.value.toUpperCase());
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!pin.match(/^[a-z0-9]{6}$/i)) {
      setErrors(["Pin must be 6 characters long and alphanumeric"]);
      return;
    }

    api
      .getRooms({ pin: pin })
      .then((room) => {
        const roomId = room._id;
        navigate(`/games/${roomId}`);
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  }

  return (
    <section className="flex-center-section auth JoinPrivateGame">
      <div className="window-center-grey auth">
        <form>
          {errors.length > 0 && <ErrorList messages={errors} />}
          <Input
            type="text"
            name="pin"
            action={handleInputChange}
            className="pin"
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
