import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

function Home() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          {user?.username && <h2>Welcome back, {user.username}</h2>}
        </>
      ) : (
        <>
          <h2>Welcome to the Home Page</h2>
          <p>Thank you for participating in this little experiment.</p>
          <p>For a while now I've wanted to step away from Instagram but I always had a fear of missing something or making it unnecessarily hard to get in contact with me.</p>
          <p>So I made this little chat app to allow people to get in contact with me without having to use Instagram.</p>
          <p>Feel free to <Link to="/signup">sign up</Link> or <Link to="/login">login</Link> and send me a message.</p>
        </>
      )}
    </>
  );
}

export default Home;