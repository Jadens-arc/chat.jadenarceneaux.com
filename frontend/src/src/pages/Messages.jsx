import ChannelView from "@/components/messages/ChannelView";
import ChannelList from "@/components/messages/ChannelList";
import { use, useEffect, useState } from "react";
import api from '@/api';

function Messages() {
  let messageStyle = {
    display: "flex",
    flexDirection: "row",
    flex: "1 auto",
  }


  let [channels, setChannels] = useState({});
  let [currentChannel, setCurrentChannel] = useState({});

  const handleNewMessage = () => {
    setCurrentChannel({newChannel: true});
  }

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await api.get('/channels/list');
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <>
      <h2>Your Channels</h2>
      <div style={messageStyle}>
        <div style={{ width: "20%" }}>
          <button onClick={handleNewMessage}>New Message</button>
          <ChannelList channels={channels} setCurrentChannel={setCurrentChannel}/>
        </div>
        <ChannelView currentChannel={currentChannel}/>
      </div>
    </>
  );
}

export default Messages;