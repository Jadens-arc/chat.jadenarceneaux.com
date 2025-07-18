import { Link } from 'react-router-dom';

function Header(user) {
  return (
    <div className="Header">
      <header>
        <div className="main">
          <Link to="/">Jaden Arceneaux - Chat</Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          &nbsp;
          {user.username ? (
            <Link to="/messages">Messages</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              &nbsp;
              <Link to="/signup">Sign Up</Link>
            </>
          )}
          <span id="dark-mode-toggle" onClick={() => window.toggleTheme && window.toggleTheme()}></span>
        </nav>
      </header>
    </div>
  );
}

export default Header;