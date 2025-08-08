import api from '@/lib/api';


function ChannelListOption({ channel, onClick }) {
  let optionStyle = {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc"
  };
  return (
    <div style={optionStyle} onClick={onClick}>
      {channel.name}
    </div>
  );
}

export default ChannelListOption;