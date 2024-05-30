import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../services/authService";
export default function EditImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await authService.getSingleImage(id);
      setImage(res.data.image);
      setDescription(res.data.image.description);
      setKeywords(res.data.image.keywords);
    };
    fetchImage();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await authService.updateImage(id, description, keywords);
    if (res.status === 200) {
      navigate("/userImageList");
    }
  };

  return image ? (
    <div>
      <form onSubmit={handleEdit}>
        <div>
          <label>Filename {image.filename}</label>
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Keywords</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type="submit">Edit</button>
        <button onClick={() => navigate("/userImageList")}>Go Back</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
