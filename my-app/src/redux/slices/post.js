import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../actions/post";

const initialState = {
  loading: false,
  postsData: [],
  error: null,
  success: false,
  errorMessage: "",
};

export const postsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.postsData = payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      });
  },
});
