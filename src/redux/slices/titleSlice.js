import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "titleSlice",
  initialState: {
    // title: 설문지 제목
    // description: 설문지 설명
    // isFocused: 설문지 제목&설명 카드 포커스 여부
    title: "제목 없는 설문지",
    description: "",
    isFocused: false,
  },
  reducers: {
    // AdminPage - 설문지 제목 카드의 포커스 상태를 설정하는 함수
    setFocusedTitleCard: (state, action) => {
      state.isFocused = action.payload;
    },
    // AdminPage - 설문지 제목의 내용을 업데이트하는 함수
    updateTitle: (state, action) => {
      const { title } = action.payload;
      state.title = title;
    },
    // AdminPage - 설문지 설명의 내용을 업데이트하는 함수
    updateDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description;
    },
  },
});

export const { setFocusedTitleCard, updateTitle, updateDescription } = titleSlice.actions;
