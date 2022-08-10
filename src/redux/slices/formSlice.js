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
      const { title, description } = action.payload;
      state.title = title;
      state.description = description;
    },
  },
});

export const { updateTitle } = formSlice.actions;
