import React from 'react';
import { Alert } from 'reactstrap';

const Message = ({ color, message, styling }) => {
  return (
    <Alert color={color} className={styling}>
      {message}
    </Alert>
  );
}

export default Message;