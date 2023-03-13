import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./ErrorList.css";

const ErrorList = ({ messages, closeAction }) => {
  return (
    <div className='ErrorList'>
      {closeAction && (
        <div className='actionBar'>
          <button className='closeButton' onClick={closeAction}>
            <HighlightOffIcon className='' />
          </button>
        </div>
      )}
      {messages.map(message => (
        message &&
        <p className='error-wrapper'>
          <span>
            <ErrorOutlineIcon className='error-icon' />
          </span>
          <span>{message}</span>
        </p>
      ))}
    </div>
  );
};

export default ErrorList;