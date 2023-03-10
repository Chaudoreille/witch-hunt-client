import React from "react";
import Button from "../../components/Button/Button";
import "./Welcome.css";

function Welcome() {
  return (

      <section>
          <div className="left">
              <img src="images/witch-run_logo.png"/>
              <div className="buttons">
                <Button>Login</Button>
                <Button>Signup</Button>
              </div>
          </div>
          <div className="right">
              list of game cards
          </div>
      </section>
  )
}

export default Welcome;
