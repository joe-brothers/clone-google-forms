import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "titleSlice",
  initialState: {
    title: "제목 없는 설문지",
    description: "설문지 설명",
    isFocused: false,
  },
  reducers: {
    focusTitleCard: (state) => {
      state.isFocused = true;
    },
    unfocusTitleCard: (state) => {
      state.isFocused = false;
    },
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

export const {
  focusTitleCard,
  unfocusTitleCard,
  updateTitle,
  updateDescription,
} = titleSlice.actions;
