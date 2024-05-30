import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function NavBar() {
  const user = authService.getCurrentUser();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    // clear the search input
    setQuery("");
  };

  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
        )}
        {user && (
          <>
            <li>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </li>
          </>
        )}

        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}

        {user && (
          <li>
            <Link to="/uploadImage">Upload Image</Link>
          </li>
        )}

        {user && (
          <li>
            <Link to="/userImageList">My Images</Link>
          </li>
        )}
        {user && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
