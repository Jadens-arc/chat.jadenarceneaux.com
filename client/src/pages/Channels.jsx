import ChannelView from "@/components/messages/ChannelView";
import ChannelNew from "@/components/messages/ChannelNew";
import ChannelList from "@/components/messages/ChannelList";
import { Navigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useAlert } from "@/components/alerts/AlertProvider";
import { useAuth } from "@/components/AuthProvider";
import api from '@/lib/api';

function Channels() {
  let [channels, setChannels] = useState([]);
  let [currentChannel, setCurrentChannel] = useState({});
  let { addAlert } = useAlert();
  const { isAuthenticated, user } = useAuth();

  const handleNewChannel = () => {
    setCurrentChannel({newChannel: true, createChannel: (channelName, recipients) => {
      api.post('/channels', { channelName, recipients })
        .then(response => {
          setChannels(prevChannels => [...prevChannels, response.data.channel]);
          setCurrentChannel({});
          addAlert("success", "Channel created successfully");
        })
        .catch(error => {
          console.log(error);
          addAlert("danger", "Error creating channel: " + error.response.data.message);
        });
    }});
  }

  useEffect(() => {
    const fetchChannels = async () => {
      api.get('/channels')
        .then(response => {
          setChannels(response.data.channels);
          console.log("Fetched channels:", response.data.channels);
        })
        .catch(error => {
          console.log(error);
          addAlert("danger", "Error fetching channels: " + error.response.data.message)
        });
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

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