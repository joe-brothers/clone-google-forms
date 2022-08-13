import { configureStore } from "@reduxjs/toolkit";
import { titleSlice } from "../slices/titleSlice";
import { contentSlice } from "../slices/contentSlice";
import { dragSlice } from "../slices/dragSlice";

export const store = configureStore({
  reducer: {
    formTitle: titleSlice.reducer,
    formContent: contentSlice.reducer,
    dragData: dragSlice.reducer,
  },
});
