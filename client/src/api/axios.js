import axios from "axios";
import { setToken } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});





export default api;