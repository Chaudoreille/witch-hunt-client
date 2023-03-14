import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./ErrorList.css";

const ErrorList = ({ messages, closeAction }) => {
  const removeDuplicates = (messageList) => {
    const noDuplicates = new Set();
    messageList.forEach((msg) => noDuplicates.add(msg));
    return [...noDuplicates];
  };

  const cleanMessages = removeDuplicates(messages);

  return (
    <div className='ErrorList'>
      {closeAction && (
        <div className='actionBar'>
          <button className='closeButton' onClick={closeAction}>
            <HighlightOffIcon className='' />
          </button>
        </div>
      )}
      {cleanMessages.map(message => (
        message &&
        <p key={message} className='error-wrapper'>
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