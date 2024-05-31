import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";

export default function NavBar() {
  const user = authService.getCurrentUser();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? " bg-gray-100 dark:bg-gray-700" : "";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    setQuery("");
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            <Link
              to="/"
              className={
                "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                isActive("/")
              }
            >
              Home
            </Link>
            {user && (
              <Link
                to="/inbox"
                className={
                  "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                  isActive("/inbox")
                }
              >
                Inbox
              </Link>
            )}
            {user && (
              <Link
                to="/userImageList"
                className={
                  "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                  isActive("/userImageList")
                }
              >
                My Images
              </Link>
            )}
            {user && (
              <Link
                to="/uploadImage"
                className={
                  "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                  isActive("/uploadImage")
                }
              >
                Upload Image
              </Link>
            )}
            {user && (
              <Link
                to="/logout"
                className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className={
                  "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                  isActive("/login")
                }
              >
                Login
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className={
                  "px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2" +
                  isActive("/register")
                }
              >
                Register
              </Link>
            )}
            {user && (
              <div className="relative mt-4 md:mt-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Search"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
