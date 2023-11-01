import { createSlice } from "@reduxjs/toolkit";
import { getCountry } from "../actions/country";

const initialState = {
  loading: false,
  countryData: [],
  error: null,
  success: false,
  errorMessage: "",
};

export const countrySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.countryData = payload;
      })
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      });
  },
});
