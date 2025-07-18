import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <label htmlFor="password">Confirm Password:</label>
          <input type="confirm-password" id="password" name="password" required />
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </>
  );
}

export default Signup;