import '@/css/fonts.css';
import '@/css/main.css';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import Header from '@/components/Header';
import Channels from '@/pages/Channels';
import { AlertProvider } from '@/components/alerts/AlertProvider'
import { socket } from '@/socket';
import { useEffect, useState } from "react";

function App() {
  let appStyle = {
  };

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className='content' style={appStyle}> 
      <Header/>
      <AlertProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/messages" element={<Channels />} />
        </Routes>
      </AlertProvider>
    </div>
  );
}

export default App;
