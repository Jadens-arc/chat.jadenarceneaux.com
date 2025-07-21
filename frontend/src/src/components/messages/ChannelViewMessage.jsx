import { useEffect, useState } from "react";
import api from '@/api';

function ChannelViewMessage({ message, index }) {
  return (
    <div key={index} className="message">
      <p><strong>{message.sender}</strong>: {message.content}</p>
      <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  );
}

export default ChannelViewMessage;