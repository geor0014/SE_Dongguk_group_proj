import { useContext } from "react";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {/* display logout button only if user is authenticated */}
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
