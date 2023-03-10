import React, { useState } from "react";
import Button from "../../components/Button/Button";
import GameCardList from "../../components/GameCardList/GameCardList";
import "./Welcome.css";

function Welcome() {

  // TODO: replace with 10 most recent active game room
  //for testing purpose
  const data = [
    {
      name: "Arthur's room",
      language: "French",
      participants: 5,
      totalParticipants: 7,
      creationTime: 10,
      link: "#"
    },
    {
      name: "Another room",
      language: "Italian",
      participants: 10,
      totalParticipants: 20,
      creationTime: 30,
      link: "#"
    },
    {
      name: "Arthur's room",
      language: "French",
      participants: 5,
      totalParticipants: 7,
      creationTime: 10,
      link: "#"
    },
    {
      name: "Another room",
      language: "Italian",
      participants: 10,
      totalParticipants: 20,
      creationTime: 30,
      link: "#"
    },
    {
      name: "Arthur's room",
      language: "French",
      participants: 5,
      totalParticipants: 7,
      creationTime: 10,
      link: "#"
    },
    {
      name: "Another room",
      language: "Italian",
      participants: 10,
      totalParticipants: 20,
      creationTime: 30,
      link: "#"
    },
    {
      name: "Arthur's room",
      language: "French",
      participants: 5,
      totalParticipants: 7,
      creationTime: 10,
      link: "#"
    },
    {
      name: "Another room",
      language: "Italian",
      participants: 10,
      totalParticipants: 20,
      creationTime: 30,
      link: "#"
    }
  ]
  const [list, setList] = useState(data)

  return (

    <section className="Welcome">
      <div className="left">
        <img src="images/witch-run_logo.png" />
        <div className="buttons">
          <Button variant={"primary"} link={"/login"}>Login</Button>
          <Button variant={"secondary"} link={"/signup"}>Signup</Button>
        </div>
      </div>
      <div className="right">
        <GameCardList list={list} />
      </div>
    </section>
  )
}

export default Welcome;
