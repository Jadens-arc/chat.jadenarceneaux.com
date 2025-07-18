import { Link } from "react-router-dom";
import { useState } from "react";
import API from '@/API';

function Login() {
  let [formData, setFormData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    let api = new API();
    try {
      api.authenticate(formData);
    } catch (error) {
      console.error("Error during login:", error);
      

    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input value={formData.username} onChange={handleChange} type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" required />
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