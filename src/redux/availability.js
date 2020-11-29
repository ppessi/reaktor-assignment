import { createSlice } from "@reduxjs/toolkit";

import { manufacturers } from "../constants";

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: manufacturers.reduce(
    (prev, current) => ({ ...prev, [current]: {} }),
    {}
  ),
  reducers: {
    addAvailability(state, action) {
      const { manufacturer, availability } = action.payload;
      state[manufacturer] = availability;
    },
  },
});

export const { addAvailability } = availabilitySlice.actions;

export default availabilitySlice.reducer;
