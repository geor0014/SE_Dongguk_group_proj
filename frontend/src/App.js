import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import UploadImage from "./components/UploadImage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserImageList from "./components/UserImageList";
import ImageList from "./components/ImageList";
import UserList from "./components/UserList";
import SendMessage from "./components/SendMessage";
import Inbox from "./components/Inbox";
import NavBar from "./components/NavBar";
import authService from "./services/authService";

function App() {
  const [allImages, setAllImages] = useState([]);
  const user = authService.getCurrentUser();

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <ProtectedRoute
                    children={
                      <ImageList
                        allImages={allImages}
                        setAllImages={setAllImages}
                      />
                    }
                  />
                ) : (
                  <UserList />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/uploadImage"
              element={<ProtectedRoute children={<UploadImage />} />}
            />
            <Route
              path="/userImageList"
              element={
                <ProtectedRoute
                  children={<UserImageList setAllImages={setAllImages} />}
                />
              }
            />
            <Route path="/sendmessage/:recipient" element={<SendMessage />} />
            <Route
              path="/inbox"
              element={<ProtectedRoute children={<Inbox />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
