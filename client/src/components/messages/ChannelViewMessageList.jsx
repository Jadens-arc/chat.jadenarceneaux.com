import { useEffect, useState } from "react";
import api from '@/lib/api';
import ChannelViewMessage from "./ChannelViewMessage";

function ChannelViewMessageList({ messageListRef, messages, channelDetails }) {
  let containerStyle = {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  };

  let noMessagesStyle = {
    textAlign: "center",
    color: "#999",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle} ref={messageListRef}>
      {messages.map((message, index) => (
        <ChannelViewMessage channelDetails={channelDetails} message={message} key={index} />
      ))}
      <p style={{ display: messages.length === 0 ? 'block' : 'none', ...noMessagesStyle }}>
        No messages in this channel
      </p>
    </div>
  );
}

export default ChannelViewMessageList;