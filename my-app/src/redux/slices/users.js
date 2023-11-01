import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/users";

const initialState = {
  loading: false,
  usersData: [],
  error: null,
  success: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.usersData = payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      });
  },
});
