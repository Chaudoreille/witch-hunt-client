import React from 'react';
import "./Storytime.css";

const Storytime = ({ story, time, state }) => {
  return (
    <div className='Storytime'>
      <p className='story'>
        <span>
          {state === "Active" && (time === "Daytime" &&
            <img src="/images/sun.png" alt="sun" />
            || <img src="/images/moon.png" alt="sun" />)
          }
        </span>

        {story}

      </p>
    </div>
  );
};

export default Storytime;