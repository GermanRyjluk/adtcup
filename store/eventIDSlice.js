import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "1VgaAztg9yvbzRLuIjql",
};

const eventIDSlice = createSlice({
  name: "eventID",
  initialState,
  reducers: {
    setEventIDValue(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setEventIDValue } = eventIDSlice.actions;
export default eventIDSlice.reducer;
