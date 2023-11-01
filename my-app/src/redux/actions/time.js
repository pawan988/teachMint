import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTime = createAsyncThunk(
  "users/fetchTime",
  async (searchTerm, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://worldtimeapi.org/api/timezone/${searchTerm}`,
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
