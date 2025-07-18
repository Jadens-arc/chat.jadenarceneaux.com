import axios from "axios";

class API {
  constructor() {
    this.API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  authenticate(formData) {
    return axios.post(`${this.API_URL}/login`, formData)
      .then(response => {
        console.log("Login successful:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Login failed:", error);
        throw error;
      });
  }
}

export default API;