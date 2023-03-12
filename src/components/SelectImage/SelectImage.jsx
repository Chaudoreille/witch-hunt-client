import React, { useState } from "react";
import "./SelectImage.css";
import Button from "../Button/Button";
import Input from "../Input/Input"
import user from "../../pages/Signup/Signup"

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function FileSelect({
  handleFileSelect,
  cancel,
  submit,
}) {

  const [file, setFile] = useState(false)

  function handleFile() {
    handleFileSelect;
    setFile(true);
  }

  return (
    <form className="FileSelect" onSubmit={submit.action}>

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
  );
}

export default FileSelect;
