import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function NavBar() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
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
