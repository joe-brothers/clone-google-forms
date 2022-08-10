import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "titleSlice",
  initialState: {
    title: "",
    description: "",
  },
  reducers: {
    updateTitle: (state, action) => {
      const { title } = action.payload;
      state.title = title;
    },
    updateDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description;
    },
  },
});

export const { updateTitle, updateDescription } = titleSlice.actions;
