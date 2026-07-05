import { useEffect } from "react";
import api from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, getUser, setIsAuthenticating} from "../redux/slices/authSlice";
import Loading from "../components/common/Loading";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticating } = useSelector((state) => state.auth);

  
  //Fetch Token and Than user
  useEffect(() => {

    async function getToken() {
      try {
        const res = await api.get("api/auth/access-token");
        dispatch(setToken(res.data.accessToken));
        dispatch(getUser(res.data.accessToken));
      } catch (error) {
        dispatch(setToken(null));
        dispatch(setIsAuthenticating(false));      }
    }
    getToken();
  }, [dispatch]);

  //Set Token as header in every route
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

  // Handle token expire, fetch new token
  useEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.data?.message === "Unauthorized!" ||
          (error.response?.status == 401 && !originalRequest.retry)
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
          dispatch(setToken(null));
          return Promise.reject(error);
        }
      },
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, [dispatch]);

  if (isAuthenticating) {
    return <Loading />;
  }

  return children;
};
