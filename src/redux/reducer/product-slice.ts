import RestApi from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isEditProduct: false,
  currentProduct: null,
  search: [],
  current_page: 1,
  pageSize: 9,
  total: 0,
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ search: q='', page, pageSize: limit = 9 }, thunkAPI) => {
    try {
      const skip = (page - 1) * limit;
      const response = await new RestApi().get(
        `products/search?${new URLSearchParams({
          q,
          skip,
          limit,
        })}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await new RestApi().delete(`products/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ data }, thunkAPI) => {
    try {
      const response = await new RestApi().post("products/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await new RestApi().put(`products/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setEditProduct: (state, action) => {
      state.isEditProduct = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setProductCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setProductSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const {
  setEditProduct,
  setCurrentProduct,
  setProductCurrentPage,
  setProductSearch,
} = productSlice.actions;

export default productSlice.reducer;
