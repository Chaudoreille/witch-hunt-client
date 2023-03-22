import React from 'react';
import "./ProfilePicture.css";

const ProfilePicture = ({ user, title, className }) => {

  return (
    <>
      <div className={`ProfilePicture ${className || ""} ${title && "tooltip"}`}>
        <span className="tooltiptext">{title || ""}</span>
        <div className='inner-border'>
          <img src={user.image} alt={user.username} />
        </div>
      </div>
    </>
  );

};

export default ProfilePicture;