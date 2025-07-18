import './css/main.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  let user = {
    "id": "1",
    "username": "jadenarceneaux",
    "email": "contact@jadenarceneaux.com",
  };
  user = null;
  return (
    <div className='content'>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

    // <div className="content">
    //   <Header user={user}/>
    // </div>

export default App;
