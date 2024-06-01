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

  return (
    <>
      {users.length > 0 && (
        <section className="bg-white">
          <div className="container  px-6 py-8  mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
              Registered Users
            </h2>

            <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map((user, index) => (
                <div key={index} className="w-full max-w-xs text-center">
                  <img
                    className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                    src={`https://loremflickr.com/320/240/cat?random=${index}`}
                    alt="avatar"
                  />

                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-700">
                      {user}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
