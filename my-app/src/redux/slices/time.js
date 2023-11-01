import { createSlice } from "@reduxjs/toolkit";
import { getTime } from "../actions/time";
const initialState = {
  loading: false,
  timeData: [],
  error: null,
  success: false,
  errorMessage: "",
};

export const timeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTime.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.timeData = payload;
      })
      .addCase(getTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTime.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      });
  },
});
