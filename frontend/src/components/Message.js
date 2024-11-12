// src/components/Message.js
import React from 'react';
import './Message.css';

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
