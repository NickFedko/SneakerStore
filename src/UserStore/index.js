import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";

export const userStore = configureStore({
    reducer: {
        user: userReducer,
    }
});