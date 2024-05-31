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
    <>
      {allImages.length > 0 && (
        <section className="bg-white">
          <div className="container px-6 py-10 mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
                Uploads from our users
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {allImages.map((image, index) => {
                return (
                  <div key={index}>
                    <div className="relative">
                      <img
                        className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                        src={image.url}
                        alt={image.name}
                      />
                      <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                        <img
                          className="object-cover object-center w-10 h-10 rounded-full"
                          src={`https://loremflickr.com/320/240/cat?random=${index}`}
                          alt={image.owner}
                        />
                        <div className="mx-4">
                          <h1 className="text-sm text-gray-700 dark:text-gray-200">
                            {image.owner}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                      {image.name}
                    </h1>
                    <hr className="w-32 my-6 text-blue-500" />
                    <h4 className="text-sm text-gray-500">
                      {image.description}
                    </h4>
                    {/* <p className="text-sm text-gray-500"> {image.keywords}</p> */}
                    <div className="flex flex-wrap mt-4">
                      {/* filter keywods, remove all non-text items, split and map */}
                      {image.keywords
                        .replace(/[^a-zA-Z ]/g, "")
                        .split(" ")
                        .map((tag, index) => {
                          return (
                            <span
                              key={index}
                              className="px-1 py-1 mr-2 text-sm font-medium text-white bg-blue-300 rounded-lg"
                            >
                              #{tag}
                            </span>
                          );
                        })}
                    </div>
                    {user.id !== image.owner_id && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleSendMessage(image.owner)}
                          className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        >
                          Send Message
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
