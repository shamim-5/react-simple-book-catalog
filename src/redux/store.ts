import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/books/booksSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
