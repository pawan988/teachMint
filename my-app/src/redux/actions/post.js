import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getPosts = createAsyncThunk(
  "users/fetchPosts",
  async (thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        config
      );
      if (data) {
        return data;
      }
    } catch (e) {
      console.error("Error", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
