import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "../../screens/Login/LoginScreen";
import Register from "../../screens/Register/RegisterScreen";
import Protected from "../Protected";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import EditFormScreen from "../../screens/EditForm/EditFormScreen";
import { EditFormProvider } from "../../providers/formState";
import FormScreen from "../../screens/Form/FormScreen";
import { UserProvider } from "../../providers/userState";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" />
      <UserProvider>
        <EditFormProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
              <Route
                path="dashboard"
                element={
                  <Protected>
                    <DashboardScreen />
                  </Protected>
                }
              />
              <Route
                path="edit/:formId"
                element={
                  <Protected>
                    <EditFormScreen />
                  </Protected>
                }
              />
              <Route
                path="form/:formId"
                element={
                  <FormScreen />
                }
              />
          </Routes>
        </EditFormProvider>
      </UserProvider>
    </div>
  );
}

export default App;
