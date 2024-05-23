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
    alert("Username already exists");
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
      const user = {
        username: response.data.user.username,
        access_token: response.data.user.access_token,
      };
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    alert("Invalid username or password");
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

const uploadImage = (file, description, keywords) => {
  const user = getCurrentUser();
  if (user && user.access_token) {
    const formData = new FormData();
    formData.append("image", file);
    const res = axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.access_token}`,
        description,
        keywords,
      },
    });
    return res;
  }
};

const getImagesForUser = async () => {
  const user = getCurrentUser();
  if (user && user.access_token) {
    try {
      const res = await axios.get(`${API_URL}/images_for_user`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  } else {
    return [];
  }
};

const getAllImages = async () => {
  const user = getCurrentUser();
  if (user && user.access_token) {
    try {
      const res = await axios.get(`${API_URL}/images`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  } else {
    return [];
  }
};

const deleteImage = async (id) => {
  const user = getCurrentUser();
  if (user && user.access_token) {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  uploadImage,
  getImagesForUser,
  getAllImages,
  deleteImage,
};
