import React from 'react';
import "./Error.css";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// alternative error icon
// import ErrorIcon from '@mui/icons-material/Error';

const Error = ({ children }) => {
  return (
    <div className='Error'>
      {children.map(child => (
        child &&
        <div className='error-wrapper'>
          <ErrorOutlineIcon className='error-icon' />
          {child}
        </div>
      ))}
    </div>
  );
};

export default Error;