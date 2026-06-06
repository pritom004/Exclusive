import axios from "axios";
import qs from "qs";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
  }
});





export default api;