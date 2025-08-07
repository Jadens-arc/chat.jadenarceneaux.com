import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider"; 
import api from '@/api';
import { useAlert } from "@/components/alerts/AlertProvider";

function Login() {
  let [formData, setFormData] = useState({});
  let [redirect, setRedirect] = useState(false); // redirect state
  let { setToken } = useAuth();
  let { addAlert } = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    api.post("/auth/login", formData)
      .then(response => {
        let data = response.data;
        setToken(data.token);
        setRedirect(true);
        addAlert("success", "Logged In!");
      })
      .catch(error => {
        addAlert("danger", "Login failed: " + error.response.data.message);
      })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className="login-container">
        <h2>Log In</h2>
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