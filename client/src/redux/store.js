import authReducer from './slices/authslice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    auth: authReducer
  },
})
