import { useEffect } from "react";
import api from "./api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, getUser } from "./redux/slices/authSlice";
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  //Fetch Token and Than user
  useEffect(() => {
    async function getToken() {
      try {
        const res = await api.get("api/auth/access-token");
        setToken(res.data.accessToken);
        dispatch(getUser(res.data.accessToken));
      } catch (error) {
        setToken(null);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      // If we have a token and it's not a retry, add it to headers [4, 6]
      if (token && !config._retry) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(authInterceptor);
  }, [token]);

  useEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.data.message === "Unauthorized!" ||
          (error.response.status == 401 && !originalRequest.retry)
        ) {
          try {
            originalRequest.retry = true;

            const res = await api.get("api/auth/access-token");

            dispatch(setToken(res.data.accessToken));

            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        } else {
          setToken(null);
          return Promise.reject(refreshError);
        }
      },
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, []);

  return children;
};
