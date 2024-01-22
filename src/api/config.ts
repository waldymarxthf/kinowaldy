import axios from "axios";
import { BASE_URL } from "./constants";

const tokens = [
  import.meta.env.VITE_KINOPOISK_TOKEN_1,
  import.meta.env.VITE_KINOPOISK_TOKEN_2,
  import.meta.env.VITE_KINOPOISK_TOKEN_3,
  import.meta.env.VITE_KINOPOISK_TOKEN_4,
  import.meta.env.VITE_KINOPOISK_TOKEN_5,
  import.meta.env.VITE_KINOPOISK_TOKEN_6,
  import.meta.env.VITE_KINOPOISK_TOKEN_7,
  import.meta.env.VITE_KINOPOISK_TOKEN_8,
  import.meta.env.VITE_KINOPOISK_TOKEN_9,
  import.meta.env.VITE_KINOPOISK_TOKEN_10,
];
let currentTokenIndex = 0;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-API-KEY": tokens[currentTokenIndex],
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
      if (currentTokenIndex === 0) {
        return Promise.reject(error);
      }
      const config = error.config;
      config.headers["X-API-KEY"] = tokens[currentTokenIndex];
      return api(config);
    }
    return Promise.reject(error);
  }
);

export default api;
