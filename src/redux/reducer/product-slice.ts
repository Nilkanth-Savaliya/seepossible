import RestApi from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isEditProduct: false,
  currentProduct: null,
  search: "",
  current_page: 1,
  pageSize: 9,
  total: 0,
  loading: false,
  error: null,
};

interface GetProductsParams {
  search?: string;
  page: number;
  pageSize?: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product properties here
}

interface GetProductsResponse {
  products: Product[];
  total: number;
}

export const getProducts = createAsyncThunk<
  GetProductsResponse,
  GetProductsParams
>(
  "product/getProducts",
  async ({ search: q = "", page, pageSize: limit = 9 }, thunkAPI) => {
    try {
      const skip = (page - 1) * limit;
      const response: { data: GetProductsResponse } = await new RestApi().get(
        `products/search?${new URLSearchParams({
          q,
          skip: skip.toString(),
          limit: limit.toString(),
        })}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface DeleteProductParams {
  productId: number;
}

interface CreateProductParams {
  data: Product;
}

interface UpdateProductParams {
  data: Partial<Product>;
  id: number;
}

export const deleteProduct = createAsyncThunk<void, DeleteProductParams>(
  "product/deleteProduct",
  async ({ productId }, thunkAPI) => {
    try {
      await new RestApi().delete(`products/${productId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk<Product, CreateProductParams>(
  "product/createProduct",
  async ({ data }, thunkAPI) => {
    try {
      const response: { data: Product } = await new RestApi().post(
        "products/add",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, UpdateProductParams>(
  "product/updateProduct",
  async ({ data, id }, thunkAPI) => {
    try {
      const response: { data: Product } = await new RestApi().put(
        `products/${id}`,
        data
      );
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
