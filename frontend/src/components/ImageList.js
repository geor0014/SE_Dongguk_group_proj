import React, { useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function UserImageList({ allImages, setAllImages }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const handleSendMessage = async (recipient) => {
    // navigate to the send message page
    navigate(`/sendmessage/${recipient}`);
  };

  return (
    <div>
      {allImages.length > 0 ? (
        <div>
          <h1>All Images</h1>
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            {allImages.map((image, index) => (
              <li key={index}>
                <img
                  src={image.url}
                  alt={image.name}
                  width="100"
                  height="100"
                />
                <p>{image.description}</p>
                <p>{image.keywords}</p>
                <p>Posted by {image.owner}</p>
                {user.id !== image.owner_id ? (
                  <button onClick={() => handleSendMessage(image.owner)}>
                    Send Message
                  </button>
                ) : (
                  <div></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
