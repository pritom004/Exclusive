import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (cartId) => {
    const response = await api.post("/api/checkout/", {cartId});

    return response.data;
})

export const fetchCheckout = createAsyncThunk("checkout/fetchCheckout", async() => {
    const response = await api.get("/api/checkout/");

    response.data;
})

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        clientSecret: null
    },
    extraReducers: (builder) => {
        builder.addCase(createCheckout.fulfilled, (state, action) => {
            state.checkout = action.payload;
        })
        builder.addCase(fetchCheckout.fulfilled, (state, action) => {
           state.checkout = action.payload;
        })
    }
})


export default checkoutSlice.reducer;