import { configureStore } from "@reduxjs/toolkit";
import { titleSlice } from "../slices/titleSlice";
import { contentSlice } from "../slices/contentSlice";

export const store = configureStore({
  reducer: {
    formTitle: titleSlice.reducer,
    formContent: contentSlice.reducer,
  },
});
