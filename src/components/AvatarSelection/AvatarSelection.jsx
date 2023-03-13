import React, { useEffect, useState } from 'react';

const AvatarSelection = ({ count, handleChange, className, checked, setChecked }) => {
  const [avatarList, setAvatarList] = useState([]);
  const [selected, setSelected] = useState(null);

  const select = (event) => {
    if (setChecked instanceof Function) {
      setChecked(true);
    }
    setSelected(() => event.target);
    handleChange(event);
  };

  useEffect(() => {
    if (!checked && selected) {
      selected.checked = false;
      setSelected(null);
    }
  }, [checked]);

  useEffect(() => {
    const avatarData = new Set();

    while (avatarData.size < count) {
      const imageUri = `https://api.dicebear.com/5.x/bottts/svg?seed=${Math.random()}`;
      avatarData.add(imageUri);
    }

    setAvatarList(list => [...avatarData]);
  }, []);


  return (
    <div className={`AvatarSelection ${className}`} onChange={select}>
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