import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "items",
  initialState: {},
  reducers: {
    setCategoryItems(state, action) {
      const { category, items } = action.payload;
      state[category] = items;
    },
  },
});

export const { setCategoryItems } = itemSlice.actions;

export default itemSlice.reducer;
