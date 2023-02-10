import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={handleLogOut}>Se déconnecter</button>
    </div>
  )
}

export default Dashboard