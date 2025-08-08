
import { useEffect, useState } from "react";

function ChannelNew({ currentChannel }) {
  let [recipients, setRecipients] = useState([]);
  let [channelName, setChannelName] = useState("");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const recipient = e.target.value;
      if (recipient) {
        setRecipients((prevRecipients) => [...prevRecipients, recipient]);
        e.target.value = "";
      }
    }
  };
  return (
    <form style={{"border": "none"}}>
      <label htmlFor="channelName">Channel Name:</label>
      <input onChange={(e) => { setChannelName(e.target.value) }} required name="channelName" id="channelName" type="text" />
      <label htmlFor="recipient">Add Recipient:</label>
      <input onKeyDown={onEnter} name="recipient" id="recipient" type="text" />
      <label>Recipients:</label>
      <ul>
        {recipients.map((recipient, index) => (
          <li key={index}>{recipient}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Creating channel with name:", channelName, "and recipients:", recipients);
            currentChannel.createChannel(channelName, recipients);
            setRecipients([]);
          }}
        >
          Create Channel
        </button>
      </div>
    </form>
  );
}

export default ChannelNew;