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
    <>
      {user && (
        <section className="min-h-screen bg-white">
          <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:items-center lg:-mx-10">
              <div className="lg:w-1/2 lg:mx-10">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize  lg:text-3xl">
                  Send a message to {recipient}
                </h1>
                <p className="mt-4 text-gray-500">
                  Send the original poster of the image a message
                </p>

                <form className="mt-12" onSubmit={handleSubmit}>
                  <div className="-mx-2 md:items-center md:flex">
                    <div className="flex-1 px-2">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56   focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
                <img
                  className="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-96 h-96"
                  src={`https://loremflickr.com/320/240/cat?random=${Math.floor(
                    Math.random() * 1000
                  )}`}
                  alt="user avatar"
                />
                <h1 className="mt-4 text-xl font-semibold text-gray-800 capitalize lg:text-2xl">
                  {recipient}
                </h1>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
