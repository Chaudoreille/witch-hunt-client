import React from "react";
import "./GameCard.css";
import ButtonLink from "../Button/ButtonLink";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PassedTime from "../PassedTime/PassedTime";

function GameCard({ game, displayLink }) {
  const id = game._id;
  const name = game.name;
  const language = game.spokenLanguage;
  const participants = game.state.players.length;
  const totalParticipants = game.maxPlayers;

  const link = displayLink ? `/games/${id}` : null;

  return (
    <div className="GameCard">
      <div className="card-left">
        <h3>{language}</h3>
        <h2>{name}</h2>
        <h3>
          <PermIdentityIcon className="icon-user" />
          <span>
            {participants}/{totalParticipants}
          </span>
        </h3>
      </div>
      <div className="card-right">
        <h3>
          <PassedTime model={game} />
        </h3>
        <div>
          {link && (
            <ButtonLink variant={"small"} link={link}>
              Join
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
