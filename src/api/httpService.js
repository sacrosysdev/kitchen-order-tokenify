import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // <- enable cookies to be sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



export default API;
