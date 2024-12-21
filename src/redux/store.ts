//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user-slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
