import React, { useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function UserImageList({ allImages, setAllImages }) {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    try {
      const fetchImages = async () => {
        const res = await authService.getAllImages();
        if (res.data.images.length) {
          setAllImages(res.data.images);
        } else {
          setAllImages([]);
        }
      };
      if (user && user.access_token) {
        fetchImages();
      } else {
        setAllImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  return (
    <div>
      <h1>All Images</h1>
      {allImages.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {allImages.map((image, index) => (
            <li key={index}>
              <img src={image.url} alt={image.name} width="100" height="100" />
              <p>{image.description}</p>
              <p>{image.keywords}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
}
