import { createSlice } from "@reduxjs/toolkit";

import { categories } from "../constants";

export const selectedCategory = createSlice({
  name: "selectedCategory",
  initialState: categories[0],
  reducers: {
    selectCategory(state, action) {
      const category = action.payload;
      return category;
    },
  },
});

export const { selectCategory } = selectedCategory.actions;

export default selectedCategory.reducer;
