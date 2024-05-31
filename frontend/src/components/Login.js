import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {!user && (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </h3>
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Login
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-white placeholder-white bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-white placeholder-white bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>
            </form>
            {/* END FORM */}
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="px-6 py-4">
    <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
      Welcome Back
    </h3>

    <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
      Login or create account
    </p>

    <form>
      <div class="w-full mt-4">
        <input
          class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          placeholder="Email Address"
          aria-label="Email Address"
        />
      </div>

      <div class="w-full mt-4">
        <input
          class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="Password"
          aria-label="Password"
        />
      </div>

        <button class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Sign In
        </button>
      </div>
    </form>
  </div>

  <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
    <span class="text-sm text-gray-600 dark:text-gray-200">
      Don't have an account?{" "}
    </span>

    <a
      href="#"
      class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
    >
      Register
    </a>
  </div>
</div>; */
}
