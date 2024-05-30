import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await authService.searchImages(query);
      if (res.data.images.length) {
        setSearchResults(res.data.images);
      } else {
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [query]);

  const handleSendMessage = async (recipient) => {
    // navigate to the send message page
    navigate(`/sendmessage/${recipient}`);
  };

  return (
    <div>
      {searchResults.length > 0 ? (
        <div>
          <h1>All Images</h1>
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            {searchResults.map((image, index) => (
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
