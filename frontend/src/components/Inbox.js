import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function Inbox() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      const res = await authService.getInbox();
      setMessages(res.data.messages);
    };
    if (user) {
      fetchInbox();
    } else {
      setMessages([]);
    }
  }, [user, setMessages]);

  const handleMarkRead = async (id) => {
    try {
      await authService.markRead(id);
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await authService.deleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = (recipient) => {
    navigate(`/sendmessage/${recipient}`);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Inbox</h1>
          <ul>
            {messages.map((message) => (
              <li
                key={message.id}
                style={{ fontWeight: message.is_read ? "normal" : "bold" }}
              >
                <p>From: {message.sender}</p>
                <p>{message.content}</p>
                <p>{new Date(message.timestamp).toLocaleString()}</p>
                {!message.is_read && (
                  <button onClick={() => handleMarkRead(message.id)}>
                    Mark as read
                  </button>
                )}
                <button onClick={() => handleReply(message.sender)}>
                  Reply
                </button>
                <button onClick={() => handleDelete(message.id)}>Delete</button>
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
