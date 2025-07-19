import { Link } from 'react-router-dom';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useAuth } from '@/components/AuthProvider';


function Header() {
  const { isAuthenticated, token, user } = useAuth();
  return (
    <div className="Header">
      <header>
        <div className="main">
          <Link to="/">Jaden Arceneaux - Chat</Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          &nbsp;
          {isAuthenticated ? (
            <>
              <Link to="/messages">Messages</Link>
              &nbsp;
              <Link to="/logout">Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              &nbsp;
              <Link to="/signup">Sign Up</Link>
            </>
          )}
          &nbsp;|
          <DarkModeToggle />
        </nav>
      </header>
    </div>
  );
}

export default Header;