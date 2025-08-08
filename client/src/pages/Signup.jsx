import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider"; 
import api from '@/lib/api';
import { useAlert } from "@/components/alerts/AlertProvider";

function Signup() {
  let [formData, setFormData] = useState({});
  let [redirect, setRedirect] = useState(false); // redirect state
  let { setToken } = useAuth();
  let { addAlert } = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    api.post("/auth/signup", formData)
      .then(response => {
        let { token } = response.data;
        setToken(token);
        setRedirect(true);
        addAlert("success", "Successfully signed up. Now please log in")
      })
      .catch(error => {
        addAlert("danger", "Sign up failed: " + error.response.data.message);
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
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
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