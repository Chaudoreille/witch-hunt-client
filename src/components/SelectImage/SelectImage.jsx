import React, { useState } from "react";
import "./SelectImage.css";
import Button from "../Button/Button";
import user from "../../pages/Signup/Signup";
import AvatarSelection from "../../components/AvatarSelection/AvatarSelection";

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function FileSelect({ onChange, cancel, submit, }) {
  const [file, setFile] = useState(false);

  function handleFile(event) {
    onChange(event.target.file[0]);
    setFile(true);
  }

  function handleAvatar(event) {
    onChange(event.target.value);
    setFile(false);
  }

  return (
    <>

      <form className="FileSelect" onSubmit={submit.action}>
        <h3>Choose your favorite avatar</h3>
        <AvatarSelection className="random-avatars" count={8} onChange={handleAvatar} />
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