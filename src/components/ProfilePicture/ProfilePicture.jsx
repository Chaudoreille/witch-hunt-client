import React from 'react';
import "./ProfilePicture.css";

const ProfilePicture = ({ user, title, className }) => {

  return (
    <>
      <div className={`ProfilePicture ${className || ""}`}>
        <div className='inner-border'>
          <img src={user.image} alt={user.username} title={title || ""} />
        </div>
      </div>
    </>
  );

};

export default ProfilePicture;