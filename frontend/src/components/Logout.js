import { useContext } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div>
      {/* display logout button only if user is authenticated */}
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
