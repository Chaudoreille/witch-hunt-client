import React from "react";
import "./GameCard.css";
import Button from "../Button/Button";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

function GameCard({ name, language, participants, totalParticipants, creationTime, link }) {

    return (
        <div className="GameCard">
            <div className="card-left">
                <h3>{language}</h3>
                <h2>{name}</h2>
                <h3><PermIdentityIcon className="icon-user" />{participants}/{totalParticipants}</h3>
            </div>
            <div className="card-right">
                <small>{creationTime} min ago</small>
                <div>
                    {link && <Button variant={"small"} link={"/gameroomId"}>Join</Button>}
                </div>
            </div>

        </div>

    )
}

export default GameCard;