// services/axiosInstance.ts
import axios from "axios";
import localStorageUtil from "../store/localStorageUtil";

// Função para obter o token (pode ser do localStorage, cookie, etc.)
const getToken = () => {
  return localStorageUtil.getUser()?.id;
};

const axiosInstance = axios.create({
  baseURL: "/api", // Defina a baseURL para todas as requisições
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
