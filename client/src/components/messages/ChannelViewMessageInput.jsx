import { useEffect, useState } from "react";
import api from '@/lib/api';

function ChannelViewMessageInput({ sendMessage }) {

  let containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const onEnter = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      sendMessage(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div style={containerStyle}>
      <input onKeyDown={onEnter} type="text" />
    </div>
  );
}

export default ChannelViewMessageInput;