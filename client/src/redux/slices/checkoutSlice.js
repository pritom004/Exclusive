import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (cartId) => {
    const response = await api.post("/api/checkout/", {cartId});

    return response.data;
})

export const fetchCheckout = createAsyncThunk("checkout/fetchCheckout", async() => {
    const response = await api.get("/api/checkout/");

    response.data;
})

export const createPaymentIntent = createAsyncThunk(
  "checkout/createPaymentIntent",
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/checkout/create-payment-intent", orderDetails);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Payment intent creation failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        clientSecret: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.checkout = action.payload;
        })
        .addCase(fetchCheckout.fulfilled, (state, action) => {
           state.checkout = action.payload;
        })
        .addCase(createPaymentIntent.fulfilled, (state, action) => {
            state.clientSecret = action.payload?.clientSecret ?? null;
        })
        .addCase(createPaymentIntent.rejected, (state) => {
            state.clientSecret = null;
        })       
    }
})


export default checkoutSlice.reducer;