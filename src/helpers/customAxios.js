import axios from "axios";
import { getToken } from "./token";

export const useAxios = axios.create({
  baseURL: "http://localhost:3000",
});

useAxios.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
