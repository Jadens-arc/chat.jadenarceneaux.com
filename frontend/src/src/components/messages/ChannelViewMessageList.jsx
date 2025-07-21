import { useEffect, useState } from "react";
import api from '@/api';
import ChannelViewMessage from "./ChannelViewMessage";

function ChannelViewMessageList({ messages }) {

  let containerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  let noMessagesStyle = {
    textAlign: "center",
    color: "#999",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      {messages.map((message, index) => (
        <ChannelViewMessage message={message} key={index} />
      ))}
      <p style={{ display: messages.length === 0 ? 'block' : 'none', ...noMessagesStyle }}>
        No messages in this channel
      </p>
    </div>
  );
}

export default ChannelViewMessageList;