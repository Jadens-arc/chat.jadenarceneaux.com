import { useEffect, useState } from "react";
import api from '@/api';
import ChannelViewMessageInput from "./ChannelViewMessageInput";
import ChannelViewMessageList from "./ChannelViewMessageList";
import { socket } from '@/socket';

function ChannelView({ currentChannel }) {
  let [channelDetails, setChannelDetails] = useState({});
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentChannel.id) {
      console.log("Fetching channel details for ID:", currentChannel.id);
      api.get(`/channels/${currentChannel.id}`)
        .then(response => {
          console.log("Fetched channel details:", response.data);
          setChannelDetails(response.data.channel);
        })
        .catch(error => {
          console.error("Error fetching channel details:", error);
        });
    }
  }, [currentChannel.id]);  

  let containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const sendMessage = (messageContent) => {
    if (currentChannel.id) {
      console.log("Sending message to channel:", currentChannel.id);
      console.log("Message content:", messageContent);
      socket.emit('message', {
        content: messageContent,
        channelId: currentChannel.id,
      });
    } else {
      console.error("No channel selected to send message.");
    }
  };

  useEffect(() => {
    if (currentChannel) {
      console.log("Joining channel:", currentChannel.id);
      socket.emit('joinChannel', { channelId: currentChannel.id });
      socket.on('newMessage', (message) => {
        console.log("New message received:", message);
      });
      return () => {
        socket.off('newMessage');
      };
    }
  }, []);


  return (
    <div style={containerStyle}>
      {currentChannel.id ? (
        <>  
          <ChannelViewMessageList messages={messages}/>
          <ChannelViewMessageInput sendMessage={sendMessage}/>
        </>
      ) : (
        <p>No channel selected</p>
      )}
    </div>
  );
}

export default ChannelView;