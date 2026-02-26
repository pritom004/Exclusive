import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";


export const addToCart = createAsyncThunk("cartSlice/addToCart", async(cartData, {rejectWithValue}) => {
  try {
    const response = await api.post("/api/items/add", cartData);

    if(response.status !== 200 && response.status !== 201){
      return rejectWithValue(response.data)
    }


    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
}) 

export const fetchCart = createAsyncThunk("cartSlice/fetchCart", async (cartData) => {
 const response =  await api.post("/api/items/", cartData);
 return response.data;
})

export const removeItem = createAsyncThunk("cartSlice/removeItem", async (cartData) => {
  const response =  await api.delete(`/api/items/${cartData.productId}`, {data: {userId: cartData?.userId, guestId: cartData.guestId}});
  return response.data;
})

export const updateItem = createAsyncThunk("cartSlice/updateItem", async (cartData) => {
  const response =  await api.put(`/api/items/${cartData.productId}`, {userId: cartData?.userId, guestId: cartData.guestId, quantity: cartData.quantity});
  return response.data;
})



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
    .addCase(addToCart.pending, (state) => {
      state.loading = true;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
          
            toast.success("Product added successfully");
      state.cart = action.payload;
      state.loading = false;
     
    })
    .addCase(addToCart.rejected, (state, action) => {
       state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchCart.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    })
    .addCase(fetchCart.rejected, (state) => {
      state.loading = false;
    })
    .addCase(removeItem.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
      toast.success(action.payload.message)
    })
    .addCase(updateItem.fulfilled, (state, action) => {
      state.cart = action.payload;
    })
  }
});

export default cartSlice.reducer;
