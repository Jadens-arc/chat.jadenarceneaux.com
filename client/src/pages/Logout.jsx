import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

function Logout() {
  let { setToken } = useAuth();
  useState(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <Navigate to="/" replace={true} />
  );
}

export default Logout;