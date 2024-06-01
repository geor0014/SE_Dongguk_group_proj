import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

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
      const trimmedDescription = description.trim();
      const trimmedKeywords = keywords.trim();
      await authService.uploadImage(file, trimmedDescription, trimmedKeywords);
      alert("Image uploaded successfully");
      navigate("/userImageList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user && (
        <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-100">
          <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
            <div className="px-6 py-6 md:px-8 md:py-0">
              <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
                Upload Your{" "}
                <span className="text-blue-600 dark:text-blue-400 md:text-blue-300">
                  Images
                </span>
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
                Upload and share images with the community so that other users
                can see them and respond to them
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pb-3 md:py-0 md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col p-1.5 overflow-hidden  focus-within:ring focus-within:ring-opacity-40  focus-within:ring-blue-300">
                <input
                  className="px-2 mt-2 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
                <textarea
                  className="px-2 mt-2 py-2 mt-2 border-b-2 border-indigo-500 text-gray-700 placeholder-gray-500 bg-white outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <input
                  className="px-2 mt-2 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="text"
                  name="keywords"
                  placeholder="Keywords"
                  value={keywords}
                  onChange={handleKeywordsChange}
                />
                <button
                  className="px-2 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
