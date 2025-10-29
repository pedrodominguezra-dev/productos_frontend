import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
