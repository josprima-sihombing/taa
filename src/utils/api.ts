import { useUserStore } from "@/stores/auth-store";
import axios from "axios";

const API_BASE_URL = "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api";

const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use(
  (config) => {
    const user = useUserStore.getState().user;

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
