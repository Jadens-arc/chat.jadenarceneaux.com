import { useEffect, useState, useRef } from "react";
import api from '@/api';
import ChannelViewMessageInput from "./ChannelViewMessageInput";
import ChannelViewMessageList from "./ChannelViewMessageList";
import { socket } from '@/socket';
const subtle = window.crypto.subtle;
const encoder = new TextEncoder();

async function encryptMessage(message) {
  return new Promise((resolve, reject) => {
    window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    ).then(key => {
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoder.encode(message)
      ).then(ciphertext => {
        const buffer = new Uint8Array(ciphertext);
        resolve(btoa(String.fromCharCode(...buffer)));
      });
    });
  });
}

function ChannelView({ currentChannel }) {
  let [channelDetails, setChannelDetails] = useState({});
  let [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (currentChannel.id) {
      console.log("Fetching channel details for ID:", currentChannel.id);
      api.get(`/channels/${currentChannel.id}`)
        .then(response => {
          console.log("Fetched channel details:", response.data);
          setChannelDetails(response.data.channel);
          api.get(`/channels/${currentChannel.id}/messages`)
            .then(response => {
              console.log("Fetched messages details:", response.data);
              setMessages(response.data.messages);
            })
            .catch(error => {
              console.error("Error fetching channel details:", error);
            });
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
      encryptMessage(messageContent).then(encryptedMessage => {
        console.log("Encrypted message: ", encryptedMessage);
        socket.emit('message', {
          content: encryptedMessage,
          channelId: currentChannel.id,
          token: localStorage.getItem('token'),
        });
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      });
    } else {
      console.error("No channel selected to send message.");
    }
  };

  useEffect(() => {
    if (currentChannel.id) {
      console.log("Joining channel:", currentChannel.id);
      socket.emit('joinChannel', { channelId: currentChannel.id });
      socket.on('message', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
        console.log("New message received:", message);
      });
      return () => {
        socket.off('message');
      };
    }
  }, [currentChannel]);

  return (
    <div style={containerStyle}>
      {currentChannel.id ? (
        <>  
          <ChannelViewMessageList messageListRef={messageListRef} messages={messages} channelDetails={channelDetails}/>
          <ChannelViewMessageInput sendMessage={sendMessage}/>
        </>
      ) : (
        <p>No channel selected</p>
      )}
    </div>
  );
}

export default ChannelView;