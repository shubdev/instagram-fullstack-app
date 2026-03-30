import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
