import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    title: "",
    description: "",
    questions: [],
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

export const { updateTitle, updateDescription } = formSlice.actions;
