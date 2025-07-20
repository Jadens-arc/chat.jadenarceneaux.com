import { useEffect, useState } from "react";
import api from '@/api';

function ChannelView({ currentChannel }) {
  let [channelDetails, setChannelDetails] = useState({});
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
  return (
    <> 
      <div>
        {currentChannel.id ? (
          <>  
            <b>Channel: {channelDetails.name}</b>
            <p>Channel ID: {channelDetails.id}</p>
            <p>Created At: {new Date(channelDetails.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(channelDetails.updatedAt).toLocaleString()}</p>
            <p>Members:</p>
            <ul>
              {channelDetails.recipients && channelDetails.recipients.map((recipient, index) => (
                <li key={index}>{recipient}</li>
              ))} 
            </ul>
          </>
        ) : (
          <p>No channel selected</p>
        )}
      </div>
    </>
  );
}

export default ChannelView;