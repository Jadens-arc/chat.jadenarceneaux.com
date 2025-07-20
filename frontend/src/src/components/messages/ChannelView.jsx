import { useEffect } from "react";

function ChannelView({ currentChannel }) {
  let containerStyle = {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
  };
  if (currentChannel.newChannel) {
    return (
      <div style={containerStyle}>
        <h3>Create a New Message</h3>
        <p>Who do you want to send it to</p>
        <input type="text" />
      </div>
    );
  }
  return (
    <div>
    </div>
  );
}

export default ChannelView;