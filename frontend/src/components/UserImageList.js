import React, { useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function UserImageList({ setAllImages }) {
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const fetchImages = async () => {
        const res = await authService.getImagesForUser();
        if (res.data) {
          setImages(res.data.images);
        } else {
          setImages([]);
        }
      };
      if (user && user.access_token) {
        fetchImages();
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await authService.deleteImage(id);
      setImages(images.filter((image) => image.id !== id));
      setAllImages((allImages) => allImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {images.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img src={image.url} alt={image.name} width="100" height="100" />
              <p>{image.description}</p>
              <p>{image.keywords}</p>
              <button onClick={() => handleDelete(image.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}
