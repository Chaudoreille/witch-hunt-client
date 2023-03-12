import React, { useState } from "react";
import "./SelectImage.css";
import Button from "../Button/Button";
import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function FileSelect({ updateImage, cancel, submit, }) {
  const [file, setFile] = useState(false);

  function handleFile(event) {
    updateImage(event.target.files[0]);
    setFile(true);
  }

  function handleAvatar(event) {
    updateImage(event.target.value);
    setFile(false);
  }

  return (
    <>

      <form className="FileSelect" onSubmit={submit.action}>
        <h3>Choose your favorite avatar</h3>
        <AvatarSelection className="random-avatars" count={8} handleChange={handleAvatar} />
        <h3>or</h3>
        <div className="wrapper">
          <div className="absolute">
            <div className="attach-file">
              <i><CloudUploadOutlinedIcon /></i>
              <span>
                {file ? "File uploaded" : "Browse to upload a picture"}
              </span>
            </div>
          </div>
          <input type="file" className="input-select" onChange={handleFile}></input>
        </div>
        <div className="buttons">
          <Button type="submit" action={submit.action} variant="primary" >
            {submit.label || "Submit"}
          </Button>
          {cancel && (
            <Button action={cancel.action} variant="secondary">
              {cancel.label}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default FileSelect;