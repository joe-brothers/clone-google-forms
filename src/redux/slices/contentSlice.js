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
        chosenOptions: [],
        etcInput: "",
      },
    ],
  },
  reducers: {
    fillDummyQuestions: (state) => {
      const dummyQuestions = [
        {
          title: "질문1 - 단답형 (아래 장문형 질문->제목없음)",
          type: "textShort",
          optionList: ["옵션 1"],
          hasEtc: false,
          isRequired: false,
          isFocused: true,
          chosenOptions: [],
          etcInput: "",
        },
        {
          title: "",
          type: "textLong",
          optionList: ["옵션 1"],
          hasEtc: false,
          isRequired: true,
          isFocused: false,
          chosenOptions: [],
          etcInput: "",
        },
        {
          title: "질문 3 - 객관식",
          type: "radio",
          optionList: ["11111", "2222", "33333"],
          hasEtc: true,
          isRequired: false,
          isFocused: false,
          chosenOptions: [],
          etcInput: "",
        },
        {
          title: "질문 4 - 체크박스",
          type: "checkbox",
          optionList: ["aaaa", "bbbb", "cccc"],
          hasEtc: false,
          isRequired: false,
          isFocused: false,
          chosenOptions: [],
          etcInput: "",
        },
        {
          title: "질문 5 - 드롭다운",
          type: "dropdown",
          optionList: ["Hi", "Hello", ":)"],
          hasEtc: false,
          isRequired: true,
          isFocused: false,
          chosenOptions: [],
          etcInput: "",
        },
      ];
      state.questions = dummyQuestions;
    },
    focusQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isFocused = true;
    },
    unfocusQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isFocused = false;
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
        chosenOptions: [],
        etcInput: "",
      };
      state.questions.splice(index, 0, defaultQuestion);
    },
    duplicateQuestionAt: (state, action) => {
      const { index } = action.payload;
      let duplicatedQuestion = {
        ...state.questions[index],
        chosenOptions: [],
        etcInput: "",
      };
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
      state.questions[index].optionList.push(`옵션 ${state.questions[index].optionList.length + 1}`);
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
    // PreviewPage, SubmitPage
    updateOptionText: (state, action) => {
      const { index, text } = action.payload;
      state.questions[index].chosenOptions[0] = text;
    },
    updateOptionRadio: (state, action) => {
      const { index, value } = action.payload;
      state.questions[index].chosenOptions[0] = value;
    },
    updateOptionCheckbox: (state, action) => {
      const { index, value, checked } = action.payload;
      if (checked) state.questions[index].chosenOptions.push(value);
      else state.questions[index].chosenOptions.splice(state.questions[index].chosenOptions.indexOf(value), 1);
    },
    updateEtcInput: (state, action) => {
      const { index, etcInput } = action.payload;
      if (!state.questions[index].chosenOptions.includes("기타")) {
        if (state.questions[index].type === "radio") {
          state.questions[index].chosenOptions = [];
        }
        state.questions[index].chosenOptions.push("기타");
      }
      state.questions[index].etcInput = etcInput;
    },
  },
});

export const {
  fillDummyQuestions,
  updateOptionText,
  updateOptionRadio,
  updateOptionCheckbox,
  updateEtcInput,
  focusQuestionAt,
  unfocusQuestionAt,
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
