import ChannelView from "@/components/messages/ChannelView";
import ChannelNew from "@/components/messages/ChannelNew";
import ChannelList from "@/components/messages/ChannelList";
import { use, useEffect, useState } from "react";
import api from '@/api';

function Channels() {
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
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    overflowY: "hidden",
  };

  let messageStyle = {
    display: "flex",
    flexDirection: "row",
    flex: "1 auto",
    flex: 1,                 // fill remaining vertical space in parent
    overflowY: "auto",       // make only this scrollable
  }

  let channelContainerStyle = {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
  };


  return (
    <div style={containerStyle}>
      <h2>Your Message Channels</h2>
      <div style={messageStyle}>
        <div style={{ width: "20%", marginRight: "40px" }}>
          <button onClick={handleNewChannel}>New Channel</button>
          <ChannelList channels={channels} setCurrentChannel={setCurrentChannel}/>
        </div>
        <div style={channelContainerStyle}>
          {currentChannel.newChannel ? (
            <ChannelNew currentChannel={currentChannel} />
          ) : (
            <ChannelView currentChannel={currentChannel} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Channels;