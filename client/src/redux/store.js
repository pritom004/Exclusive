import authReducer from './slices/authSlice';
import productReducer from "./slices/productSlice"
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer
  },
})
