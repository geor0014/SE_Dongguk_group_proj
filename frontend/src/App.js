import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:5000";
  // lets get all the users from the API and display them in a list format
  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      const { data } = res;
      setUsers(data.users);
    });
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      {users.map((user) => (
        <User key={Math.random().toString(36).substring(7)} user={user} />
      ))}
    </div>
  );
}

function User({ user }) {
  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
}
export default App;
