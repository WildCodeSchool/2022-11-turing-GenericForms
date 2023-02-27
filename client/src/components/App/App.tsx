import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Home from "../../screens/Public/PublicScreen";
import { Toaster } from "react-hot-toast";
import Login from "../../screens/Login/LoginScreen";
import Register from "../../screens/Register/Register";
import Dashboard from "../../screens/LayoutDashboard/DashboardMain/DashboardMain";
import Protected from "../Protected";
import LayoutFormsList from "../../screens/LayoutDashboard/LayoutDashboard";
import { CssBaseline } from "@mui/material";


function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <Protected>
              <LayoutFormsList />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
