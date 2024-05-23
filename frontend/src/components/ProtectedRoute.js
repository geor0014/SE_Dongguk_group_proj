import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/protected`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/login";
        });
    } else {
      // window.location.href = "/login";
      console.log("User is not authenticated");
    }
  }, [user]);

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
          <h1>Welcome {user.username}</h1>
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
