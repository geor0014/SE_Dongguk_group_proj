import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function UploadImage() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("Please select an image");
      return;
    }
    try {
      const res = await authService.uploadImage(file);
      alert("Image uploaded successfully");
      // in order to refresh the page after uploading an image we need to reload the page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Upload Image</h1>
        <p>You need to be logged in to upload an image</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Upload Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
