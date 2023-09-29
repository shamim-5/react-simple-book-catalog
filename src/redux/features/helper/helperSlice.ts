import { createSlice } from "@reduxjs/toolkit";

interface IInitialState{
   searchTerm: string | undefined;
}

const initialState: IInitialState = {
   searchTerm: undefined,
}

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm= action.payload.searchTerm;
    },
  },
});

export const { setSearchTerm } = helperSlice.actions;
export default helperSlice.reducer;
