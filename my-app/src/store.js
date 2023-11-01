import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./redux/slices/users";
import { postsSlice } from "./redux/slices/post";
import { countrySlice } from "./redux/slices/country";
import { timeSlice } from "./redux/slices/time";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postsSlice.reducer,
    country: countrySlice.reducer,
    time: timeSlice.reducer,
  },
});

export default store;
