import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function Inbox() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

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
      setCurrentMessage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = (recipient) => {
    navigate(`/sendmessage/${recipient}`);
  };

  return (
    <>
      {user && (
        <main className="flex w-full h-full shadow-lg rounded-3xl">
          <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll">
            <ul className="mt-6">
              {messages.map((message, index) => (
                <li
                  className="py-5 border-b px-3 transition hover:bg-indigo-100"
                  key={index}
                  onClick={() => {
                    setCurrentMessage(message);
                  }}
                >
                  <h3 className="text-lg font-semibold">
                    From: {message.sender}
                  </h3>
                  <p className="text-md text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          {currentMessage && (
            <>
              <section className="w-full p-6 flex flex-col bg-white rounded-r-3xl">
                <div className="flex justify-between items-center h-48 border-b-2 mb-8">
                  <div className="flex space-x-4 items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={`https://loremflickr.com/320/240/cat?random=1}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg">
                        {currentMessage.sender}
                      </h3>
                      <p className="text-light text-gray-400">
                        {currentMessage.sender.toLowerCase().replace(" ", ".")}
                        @gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <section>
                  <h1 className="font-bold text-2xl">Message</h1>
                  <article className="mt-8 text-gray-500 leading-7 tracking-wider">
                    <p>{currentMessage.content}</p>
                  </article>
                  <div className="mt-3">
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl"
                      onClick={() => {
                        handleReply(currentMessage.sender);
                      }}
                    >
                      Reply
                    </button>
                    <button
                      className="bg-red-600 text-white px-6 py-2 rounded-xl ml-2"
                      onClick={() => {
                        handleDelete(currentMessage.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              </section>
            </>
          )}
        </main>
      )}
    </>
  );
}
