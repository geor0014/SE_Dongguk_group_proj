import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Register />
        <Login />
        <Logout />
        <ProtectedRoute />
      </div>
      ;
    </AuthProvider>
  );
}

export default App;
