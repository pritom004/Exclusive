import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";


const getGuestId = localStorage.getItem("guest_id") || `guest_${Date.now()}`;

localStorage.setItem("guest_id", getGuestId);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/signup", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await api.post("/api/auth/login", userData)

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const getUser = createAsyncThunk("auth/getUser", async (token) => {
  const response = await api.get(
    "/api/auth/me",
   {headers: {Authorization: `Bearer ${token}`}}
  );

  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
})

export const getAccessToken = createAsyncThunk("auth/getAccessToken", async () => {
  const response = await api.get("/api/auth/access-token");

  return response.data;
})


export const updateProfile = createAsyncThunk("auth/updateProfile", async(data, {rejectWithValue}) => {
  try {
    const response = await api.post("/api/auth/update-profile", data);

    if(response.status === 200){
   
      
      return response.data;
    }
    return rejectWithValue(response.data.message)
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
})


const initialState = {
  loading: false,
  error: null,
  token: null,
  user: null,
  guestId: getGuestId,
  isAuthenticated: false
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, token) => {
        state.token = token.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("User registered successfully!")

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = false
      })
      .addCase(getUser.rejected, (state) => {
        state.loading= false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        toast.success("User logged in successfully!")
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message)
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
          state.loading = false
          state.user = null
          state.error = null
          toast.success(action.payload.message)
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false,
        state.error = false,
        state.user = action.payload.data;
        toast.success(action.payload.message)
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload)
      })
  },
});



export const {setToken} = authSlice.actions
export default authSlice.reducer;
