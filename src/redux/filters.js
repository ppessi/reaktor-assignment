import { createSlice } from "@reduxjs/toolkit";

// default type is string
const types = {
  availability: "number",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    manufacturer: "",
    availability: -1,
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      if (types[key] || "string" === "number") {
        state[key] = parseInt(value);
      } else {
        state[key] = value;
      }
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
