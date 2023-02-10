import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Home from "../../screens/Public/Public";
import { Toaster } from "react-hot-toast";
import Login from "../../screens/Login/Login";
import Register from "../../screens/Register/Register";
import Dashboard from "../../screens/Dashboard/Dashboard";
import Protected from "../Protected";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
