import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, getUser, logoutUser, getAccessToken, updateProfile } from "../redux/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const registerUserUtil = async (userData) => {
    return dispatch(registerUser(userData));
  };

  const loginUserUtil = async (userData) => {
    return dispatch(loginUser(userData));
  };

  const getUserUtil = async (token) => {
    return dispatch(getUser(token));
  };

  const logoutUserUtil = async () => {
    return dispatch(logoutUser());
  };

  const getAccessTokenUtil = async () => {
    return dispatch(getAccessToken());
  };

  const updateProfileUtil = async (data) => {
    return dispatch(updateProfile(data));
  };

  return { 
    ...authState,
    registerUserUtil, 
    loginUserUtil, 
    getUserUtil, 
    logoutUserUtil, 
    getAccessTokenUtil, 
    updateProfileUtil 
  };
}
