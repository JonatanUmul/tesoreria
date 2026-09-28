import axios from "axios";

const getToken = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userToken")) || "";
  } catch {
    return "";
  }
};

const attachToken = (config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(attachToken);
axios.interceptors.request.use(attachToken);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      sessionStorage.clear();
      window.location.hash = "#/h2h/login";
    }

    return Promise.reject(error);
  }
);

export default api;
