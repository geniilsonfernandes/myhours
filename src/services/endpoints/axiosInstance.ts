// services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Defina a baseURL para todas as requisições
});

export default axiosInstance;
