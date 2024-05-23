import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import UploadImage from "./components/UploadImage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserImageList from "./components/UserImageList";
import ImageList from "./components/ImageList";

function App() {
  const [allImages, setAllImages] = useState([]);

  return (
    <AuthProvider>
      <div className="App">
        <Register />
        <Login />
        <Logout />
        {/* <ProtectedRoute /> */}
        <UploadImage />
        <UserImageList setAllImages={setAllImages} />
        <ImageList allImages={allImages} setAllImages={setAllImages} />
      </div>
      ;
    </AuthProvider>
  );
}

export default App;
