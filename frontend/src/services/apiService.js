import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const fetchCryptoData = () => api.get("/crypto");
export const fetchNewsData = () => api.get("/news");
export const fetchCryptoDetails = (id) => api.get(`/crypto/${id}`);
