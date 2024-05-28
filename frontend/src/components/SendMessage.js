import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function SendMessage() {
  const { user } = useContext(AuthContext);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.sendMessage(recipientUsername, content);
    setRecipientUsername("");
    setContent("");
    alert("Message sent!");
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Recipient username"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
          />
          <textarea
            placeholder="Message content"
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
