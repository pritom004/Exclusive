import axios from "axios";
import qs from "qs";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    paramsSerializer: params => {
    // This will ensure arrays are serialized properly
    // skipNulls: true helps prevent sending "null" strings
    return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
  }
});





export default api;