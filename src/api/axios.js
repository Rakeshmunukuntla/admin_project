import axios from "axios";

import API_URL from "./api";

const API = axios.create({
  baseURL: API_URL,
});

// const API = axios.create({
//   baseURL: "http://localhost:5000", // backend URL
// });

// attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
