import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutData) => {
    const response = await api.post("/api/checkout/", checkoutData);

    return response.data;
})

export const fetchCheckout = createAsyncThunk("checkout/fetchCheckout", async() => {
    const response = await api.get("/api/checkout/");

    return response.data;
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
        clientSecret: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCheckout.pending, (state) => {
            state.loading = true;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.checkout = action.payload;
            state.loading = false;
        })
        .addCase(createCheckout.rejected, (state) => {
            state.loading = false;
        })
        .addCase(fetchCheckout.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCheckout.fulfilled, (state, action) => {
           state.checkout = action.payload;
           state.loading = false;
        })
        .addCase(fetchCheckout.rejected, (state) => {
           state.loading = false;
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