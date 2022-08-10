import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "../slices/formSlice";

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});
