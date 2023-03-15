import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./GameRoomForm.css";
import Toggle from "../Toggle/Toggle";

function GameRoomForm({
  handleSubmit,
  room,
  submitButtonLabel,
  dispatchRoomChanges,
}) {
  return (
    <form onSubmit={handleSubmit} className="GameRoomForm">
      <Toggle toggle={room.isPublished} optionLeft="Public" optionRight="Private" label="Visibility"
        onChangeLeft={(event) => dispatchRoomChanges({ isPublished: event.target.checked })}
        onChangeRight={(event) => dispatchRoomChanges({ isPublished: !event.target.checked })}
      />

      <Input
        name="name"
        action={(event) => dispatchRoomChanges({ name: event.target.value })}
        type="text"
        placeholder="Name of the room"
        value={room.name}
        label="Name"
      />
      <Input
        name="maxPlayers"
        type="number"
        value={room.maxPlayers}
        label="Players"
        action={(event) =>
          dispatchRoomChanges({ maxPlayers: event.target.value })
        }
      />


      <Input
        name="spokenLanguage"
        type="text"
        placeholder="Spoken language"
        value={room.spokenLanguage}
        label="Language"
        action={(event) =>
          dispatchRoomChanges({ spokenLanguage: event.target.value })
        }
      />

      <Button variant="primary">{submitButtonLabel}</Button>
    </form>
  );
}

export default GameRoomForm;
