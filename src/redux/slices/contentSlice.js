import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    questions: [
      {
        title: "제목없는 질문",
        type: "radio",
        optionList: ["옵션 1"],
        hasEtc: false,
        isRequired: false,
        isFocused: true,
      },
    ],
  },
  reducers: {
    focusQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isFocused = true;
    },
    unfocusQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isFocused = false;
    },
    addDefaultQuestion: (state, action) => {
      let defaultQuestion = {
        title: "",
        type: "radio",
        optionList: ["옵션 1"],
        hasEtc: false,
        isRequired: false,
        isFocused: true,
      };
      state.questions.push(defaultQuestion);
    },
    addDefaultQuestionAt: (state, action) => {
      const { index } = action.payload;
      let defaultQuestion = {
        title: "",
        type: "radio",
        optionList: ["옵션 1"],
        hasEtc: false,
        isRequired: false,
        isFocused: true,
      };
      state.questions.splice(index, 0, defaultQuestion);
    },
    duplicateQuestionAt: (state, action) => {
      const { index } = action.payload;
      let duplicatedQuestion = { ...state.questions[index] };
      state.questions.splice(index + 1, 0, duplicatedQuestion);
    },
    removeQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },
    changeQuestionType: (state, action) => {
      const { type, index } = action.payload;
      state.questions[index].type = type;
    },
    changeTitleAt: (state, action) => {
      const { index, title } = action.payload;
      state.questions[index].title = title;
    },
    changeNthOptionAt: (state, action) => {
      const { indexQuestion, indexOption, option } = action.payload;
      state.questions[indexQuestion].optionList[indexOption] = option;
    },
    toggleRequiredAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isRequired = !state.questions[index].isRequired;
    },
    addOptionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].optionList.push(
        `옵션 ${state.questions[index].optionList.length + 1}`
      );
    },
    addEtcOfOptionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].hasEtc = true;
    },
    removeEtcOfOptionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].hasEtc = false;
    },
    removeOptionAt: (state, action) => {
      const { indexQuestion, indexOption } = action.payload;
      state.questions[indexQuestion].optionList.splice(indexOption, 1);
    },
  },
});

export const {
  focusQuestionAt,
  unfocusQuestionAt,
  addDefaultQuestion,
  addDefaultQuestionAt,
  duplicateQuestionAt,
  removeQuestionAt,
  changeQuestionType,
  changeTitleAt,
  changeNthOptionAt,
  toggleRequiredAt,
  addOptionAt,
  addEtcOfOptionAt,
  removeEtcOfOptionAt,
  removeOptionAt,
} = contentSlice.actions;
