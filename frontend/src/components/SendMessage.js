import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

export default function SendMessage() {
  const { recipient } = useParams();
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.sendMessage(recipient, content);
    setContent("");
    alert("Message sent!");
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <h2>Send a message to {recipient}</h2>
          <textarea
            placeholder="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
