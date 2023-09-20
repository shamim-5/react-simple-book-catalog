import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = booksSlice.actions;
export default booksSlice.reducer;
