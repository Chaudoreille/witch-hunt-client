import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

function GameRoomForm({
  handleSubmit,
  room,
  submitButtonLabel,
  dispatchRoomChanges,
}) {
  return (
    <form onSubmit={handleSubmit}>
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
        name="isPublished"
        type="checkbox"
        value={room.isPublished}
        label="Visibility"
        action={(event) =>
          dispatchRoomChanges({ isPublished: event.target.checked })
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
