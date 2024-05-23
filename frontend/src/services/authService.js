import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    if (response.data.user.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
  // we need to refresh the page to reflect the changes
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
