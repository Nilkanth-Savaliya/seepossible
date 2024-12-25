"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === payload.email && user.password === payload.password
      );
      if (!user) {
        throw new Error("Invalid credentials");
      }
      Cookies.set("user-info", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Error occurred during login:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === payload.email
      );
      if (user) {
        throw new Error("User already exists");
      }
      users.push(payload);
      Cookies.set("user-info", JSON.stringify(payload));
      localStorage.setItem("users", JSON.stringify(users));
      return payload;
    } catch (error) {
      console.error("Error occurred during signup:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const user = JSON.parse(Cookies.get("user-info"));
      return user;
    } catch (error) {
      console.error("Error occurred during getting user:", error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
