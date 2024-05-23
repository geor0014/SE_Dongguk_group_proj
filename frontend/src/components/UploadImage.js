import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function UploadImage() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("Please select an image");
      return;
    }
    try {
      if (!description || !keywords) {
        alert("Description and keywords are required");
        return;
      }
      await authService.uploadImage(file, description, keywords);
      alert("Image uploaded successfully");
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
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            type="text"
            placeholder="Keywords"
            name="keywords"
            value={keywords}
            onChange={handleKeywordsChange}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
