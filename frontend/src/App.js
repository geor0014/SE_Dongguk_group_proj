import React, { useState } from "react";
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

function App() {
  const [allImages, setAllImages] = useState([]);

  return (
    <AuthProvider>
      <div className="App">
        <Register />
        <Login />
        <Logout />
        {/* <ProtectedRoute /> */}
        <UserList />
        <UploadImage />
        <UserImageList setAllImages={setAllImages} />
        <ImageList allImages={allImages} setAllImages={setAllImages} />
        <SendMessage />
        <Inbox />
      </div>
    </AuthProvider>
  );
}

export default App;
