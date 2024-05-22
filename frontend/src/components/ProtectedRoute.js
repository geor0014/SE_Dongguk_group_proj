import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      const { data } = res;
      setUsers(data.users);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Protected Route</h1>
          <p>Welcome {user.user.username}</p>
          <h2>Users</h2>
          <ul>
            {users.map((item) => (
              <li key={Math.random().toString(36).substring(7)}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Protected Route</h1>
          <p>You need to be logged in to access this page</p>
        </div>
      )}
    </div>
  );
}
