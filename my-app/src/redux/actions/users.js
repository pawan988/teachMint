import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUsers = createAsyncThunk(
  "users/fetchUsers",
  async (thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://jsonplaceholder.typicode.com/users`,
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
