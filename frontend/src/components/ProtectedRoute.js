import { Navigate } from "react-router-dom";
import authService from "../services/authService";

export default function ProtectedRoute({ children }) {
  const user = authService.getCurrentUser();
  return <div>{user ? children : <Navigate to="/login" />}</div>;
}
