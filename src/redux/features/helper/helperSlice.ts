import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  field?: string | undefined;
  searchTerm: string | undefined;
}

const initialState: IInitialState = {
  field: "",
  searchTerm: "",
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.field = action.payload.field;
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const { setSearchTerm } = helperSlice.actions;
export default helperSlice.reducer;
