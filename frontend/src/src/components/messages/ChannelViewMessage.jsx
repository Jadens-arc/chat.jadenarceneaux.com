import { useEffect, useState } from "react";
import api from '@/api';

function ChannelViewMessage({ channelDetails, message, index }) {
  let messageStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  };
  let contentStyle = {
    margin: "5px 0",
    flex: "1 1 auto", // allow to shrink/grow
    wordBreak: "break-word", // prevent overflow
    marginRight: "10px", // spacing between content and timestamp
  };
  let timestampStyle = {
    margin: "5px 0",
    color: "#999",
    whiteSpace: "nowrap", // keep timestamp on one line
    flexShrink: 0, // don't let it shrink
  };
  return (
    <div key={index} style={messageStyle}>
      <p style={contentStyle}><strong>{message.sender}</strong>: {message.content}</p>
      <p style={timestampStyle}>{new Date(message.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}

export default ChannelViewMessage;