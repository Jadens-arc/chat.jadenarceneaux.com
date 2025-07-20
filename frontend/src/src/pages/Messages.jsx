import ChannelView from "@/components/messages/ChannelView";
import ChannelNew from "@/components/messages/ChannelNew";
import ChannelList from "@/components/messages/ChannelList";
import { use, useEffect, useState } from "react";
import api from '@/api';

function Messages() {
  let messageStyle = {
    display: "flex",
    flexDirection: "row",
    flex: "1 auto",
  }


  let [channels, setChannels] = useState([]);
  let [currentChannel, setCurrentChannel] = useState({});

  const handleNewChannel = () => {
    setCurrentChannel({newChannel: true, createChannel: (channelName, recipients) => {
      api.post('/channels/create', { channelName, recipients })
        .then(response => {
          setChannels(prevChannels => [...prevChannels, response.data.channel]);
          setCurrentChannel({});
        })
        .catch(error => {
          console.error("Error creating channel:", error);
        });
    }});
  }

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await api.get('/channels/list');
        console.log("Fetched channels:", response.data.channels);
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  let containerStyle = {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
  };
  return (
    <>
      <h2>Your Message Channels</h2>
      <div style={messageStyle}>
        <div style={{ width: "20%", marginRight: "40px" }}>
          <button onClick={handleNewChannel}>New Channel</button>
          <ChannelList channels={channels} setCurrentChannel={setCurrentChannel}/>
        </div>
        <div style={containerStyle}>
          {currentChannel.newChannel ? (
            <ChannelNew currentChannel={currentChannel} />
          ) : (
            <ChannelView currentChannel={currentChannel} />
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;