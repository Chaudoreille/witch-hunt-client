import React from 'react';
import "./ProfilePicture.css";

const ProfilePicture = ({ user }) => {

  return (
    <>
      <div className='ProfilePicture'>
        <div className='inner-border'>
          <img src={user.image} alt={user.username} />
        </div>
      </div>
    </>
  );

};

export default ProfilePicture;