import React from 'react';
import "./Error.css";

const Error = ({ children }) => {
  return (
    <div className='Error error-message'>
      {children}
    </div>
  );
};

export default Error;