import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCountry = createAsyncThunk(
  "users/fetchCountry",
  async (thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://worldtimeapi.org/api/timezone`,
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
