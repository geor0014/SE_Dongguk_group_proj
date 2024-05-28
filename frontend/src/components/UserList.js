import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import authService from "../services/authService";

export default function UserList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await authService.getAllUsers();
        if (res) {
          setUsers(res);
        } else {
          setUsers([]);
        }
      };
      if (!user) {
        fetchUsers();
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  console.log(users);
  return (
    <div>
      {users.length > 0 ? (
        <div>
          <h1>All Users</h1>
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            {users.map((user, index) => (
              <li key={index}>
                <p>{user}</p>
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
