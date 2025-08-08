import api from '@/lib/api';
import ChannelListOption from './ChannelListOption';

function ChannelList({ channels, setCurrentChannel }) {
  return (
    <div >
      {channels.map((channel, index) => (
        <ChannelListOption channel={channel} key={index} onClick={() => {setCurrentChannel(channel)}} />
      ))}
    </div>
  );
}

export default ChannelList;