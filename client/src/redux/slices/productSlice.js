import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchFlashProduct = createAsyncThunk(
  "productSlice/fetchFlashProduct",
  async () => {
    const response = await api.get(
      "/api/product/products?sort=discount_desc&limit=12",
    );
    return response.data;
  },
);

export const fetchBestSellingProducts = createAsyncThunk(
  "productSlice/fetchBestSellingProducts",
  async () => {
    const response = await api.get(
      "/api/product/products?sort=rating_desc&limit=5",
    );
    return response.data;
  },
);

export const fetchExploreProducts = createAsyncThunk(
  "productSlice/fetchExploreProducts",
  async () => {
    const response = await api.get(
      "/api/product/products?minPrice=10&maxPrice=100&limit=10",
    );
    return response.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "productSlice/fetchAllProducts",
  async () => {
    const response = await api.get("/api/product/products");
    return response.data;
  },
);

export const fetchProductDetails = createAsyncThunk(
  "productSlice/fetchProductDetails",
  async (productId) => {
    const response = await api.get(`api/product/${productId}`);

    return response.data;
  },
);

export const fetchRelatedProducts = createAsyncThunk(
  "productSlice/fetchRelatedProducts",
  async (category) => {
    const response = await api.get(`api/product/products?category=${category}&sort=rating_desc&limit=5`);

    return response.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    flashSaleProducts: null,
    bestSellingProducts: null,
    exploreProducts: null,
    allProducts: null,
    selectedProduct: null,
    relatedProducts: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashProduct.fulfilled, (state, action) => {
        state.flashSaleProducts = action.payload;
      })
      .addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
        state.bestSellingProducts = action.payload;
      })
      .addCase(fetchExploreProducts.fulfilled, (state, action) => {
        state.exploreProducts = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      }).addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
      })
  },
});

export default productSlice.reducer;
