import authReducer from './slices/authSlice';
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
  },
})
