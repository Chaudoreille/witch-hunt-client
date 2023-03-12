import React, { useEffect, useState } from 'react';

const AvatarSelection = ({ count, onChange, className }) => {
  const [avatarList, setAvatarList] = useState([]);

  useEffect(() => {
    const avatarData = new Set();

    while (avatarData.size < count) {
      const imageUri = `https://api.dicebear.com/5.x/bottts/svg?seed=${Math.random()}`;
      avatarData.add(imageUri);
    }

    setAvatarList(list => [...avatarData]);
  }, []);


  return (
    <div className={`AvatarSelection ${className}`} onChange={onChange}>
      {avatarList.map((imageUri) => (
        <div key={imageUri} className="avatar">
          <input
            type="radio" name="avatar" value={imageUri} className="input-hidden" />
          <label htmlFor="avatar0">
            <img
              src={imageUri}
              alt="avatar" />
          </label>
        </div>
      ))}
    </div>
  );
};

export default AvatarSelection;;