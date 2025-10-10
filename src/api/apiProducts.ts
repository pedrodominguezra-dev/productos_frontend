import axios from "axios";

const token = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default apiClient;
