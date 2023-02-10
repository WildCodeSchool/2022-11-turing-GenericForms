import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Home from "../../screens/Home/Home";
import { Toaster } from "react-hot-toast";
import Login from "../../screens/Login/Login";
import Register from "../../screens/Register/Register";
import Dashboard from "../../screens/Dashboard/Dashboard";
import ProtectedArea from "../ProtectedArea";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Header />
      <main className="container pb-8 bg-cream">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="backoffice">
            <Route
              path="dashboard"
              element={
                <ProtectedArea>
                  <Dashboard />
                </ProtectedArea>
              }
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
