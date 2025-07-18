import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </>
  );
}

export default Login;