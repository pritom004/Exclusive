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
  async (params) => {
    const response = await api.get("/api/product/products", {params});
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

const defaultFilters = {
    sort: "newest",
    limit: 6,
    minPrice: 0,
    maxPrice: 10000,
    status: "all",
    color: [],
    size: [],
    category: "All",
    page: 1,
    search: ""
  };

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
    filter: defaultFilters
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashProduct.fulfilled, (state, action) => {
        state.flashSaleProducts = action.payload.data;
      })
      .addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
        state.bestSellingProducts = action.payload.data;
      })
      .addCase(fetchExploreProducts.fulfilled, (state, action) => {
        state.exploreProducts = action.payload.data;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      }).addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload.data;
      })
  },
});

export const {setFilter} = productSlice.actions;
export default productSlice.reducer;
