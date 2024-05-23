import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      // login after register
      await login(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? null : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}
