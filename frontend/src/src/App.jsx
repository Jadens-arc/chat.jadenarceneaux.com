import '@/css/main.css';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import Header from '@/components/Header';
import Messages from '@/pages/Messages';

function App() {
  return (
    <div className='content'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/messages" element={<Messages/>} />
      </Routes>
    </div>
  );
}

export default App;
