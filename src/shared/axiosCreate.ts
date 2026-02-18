import axios from 'axios';
const base: string = import.meta.env.VITE_TMDB_BASE_URL;
const api: string = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: base,
  headers: {
    Accept: 'application/json',
    Authorization: `${api}`,
  },
});
