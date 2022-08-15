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
        isError: false,
      },
    ],
  },
  reducers: {
    // 질문 카드의 focus 여부를 설정하는 함수
    setFocusedQuestionAt: (state, action) => {
      const { index, focused } = action.payload;
      state.questions[index].isFocused = focused;
    },
    // 질문 카드를 복제하는 함수
    duplicateQuestionAt: (state, action) => {
      const { index } = action.payload;
      let duplicatedQuestion = {
        ...state.questions[index],
        chosenOptions: [],
        etcInput: "",
      };
      state.questions.splice(index + 1, 0, duplicatedQuestion);
    },
    // 질문 카드 하나를 삭제하는 함수
    removeQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },
    // 질문 카드의 유형을 변경하는 함수 (단답형/장문형/..)
    changeQuestionType: (state, action) => {
      const { type, index } = action.payload;
      state.questions[index].type = type;
    },
    // 질문 카드의 제목을 변경하는 함수
    changeTitleAt: (state, action) => {
      const { index, title } = action.payload;
      state.questions[index].title = title;
    },
    // 질문 카드의 답변 옵션 중 하나의 내용을 변경하는 함수
    changeNthOptionAt: (state, action) => {
      const { indexQuestion, indexOption, option } = action.payload;
      state.questions[indexQuestion].optionList[indexOption] = option;
    },
    // 질문 카드의 필수 여부를 토글하는 함수
    toggleRequiredAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].isRequired = !state.questions[index].isRequired;
    },
    // 질문 카드에 옵션 하나를 추가하는 함수
    addOptionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].optionList.push(`옵션 ${state.questions[index].optionList.length + 1}`);
    },
    // 질문 카드의 옵션 하나를 삭제하는 함수
    removeOptionAt: (state, action) => {
      const { indexQuestion, indexOption } = action.payload;
      state.questions[indexQuestion].optionList.splice(indexOption, 1);
    },
    // 질문 카드의 '기타' 옵션 존재 여부를 설정하는 함수
    setEtcAt: (state, action) => {
      const { index, hasEtc } = action.payload;
      state.questions[index].hasEtc = hasEtc;
    },

    // PreviewPage - 답변으로 입력한 텍스트를 업데이트하는 함수
    updateOptionText: (state, action) => {
      const { index, text } = action.payload;
      state.questions[index].chosenOptions[0] = text;
    },
    // PreviewPage - 답변으로 선택한 라디오 또는 드롭다운 항목을 업데이트하는 함수
    updateOptionRadioOrDropdown: (state, action) => {
      const { index, value } = action.payload;
      state.questions[index].chosenOptions[0] = value;
    },
    // PreviewPage - 답변으로 선택한 체크박스 항목을 업데이트하는 함수
    updateOptionCheckbox: (state, action) => {
      const { index, value, checked } = action.payload;
      if (checked) state.questions[index].chosenOptions.push(value);
      else state.questions[index].chosenOptions.splice(state.questions[index].chosenOptions.indexOf(value), 1);
    },
    // PreviewPage - 특정 질문에서 입력한 답변을 제거하는 함수
    clearChosenOptions: (state, action) => {
      const { index } = action.payload;
      state.questions[index].chosenOptions = [];
    },
    // PreviewPage - 기타 항목에 입력한 값을 업데이트하고, '기타'가 체크되도록 하는 함수
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

    // 에러 상태를 업데이트하는 함수
    // 어떤 질문이 필수이면서 고른 옵션이 비어있다면 isError를 true로 설정
    updateErrorStatus: (state, action) => {
      const { indexQuestion } = action.payload;
      if (
        state.questions[indexQuestion].isRequired &&
        (state.questions[indexQuestion].chosenOptions.length === 0 ||
          state.questions[indexQuestion].chosenOptions[0] === "")
      )
        state.questions[indexQuestion].isError = true;
      else state.questions[indexQuestion].isError = false;
    },
    // '양식 지우기'를 수행하는 함수
    clearForm: (state) => {
      for (let i = 0; i < state.questions.length; i++) {
        state.questions[i].chosenOptions[0] = "";
        state.questions[i].chosenOptions = [];
        state.questions[i].etcInput = "";
      }
    },
    // drag & drop
    // 질문 카드를 옮기는 함수
    moveQuestion: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      state.questions.splice(
        newIndex < 0 ? state.questions.length + newIndex : newIndex,
        0,
        state.questions.splice(oldIndex, 1)[0]
      );
    },
    // 하나의 기본 질문을 추가하는 함수 (맨 처음 AdminPage 접속시 실행)
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
        isError: false,
      };
      state.questions.splice(index, 0, defaultQuestion);
    },
    // 더미 데이터를 채우는 함수 (테스트를 쉽게 하기 위해 추가함)
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
          isError: false,
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
          isError: false,
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
          isError: false,
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
          isError: false,
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
          isError: false,
        },
      ];
      state.questions = dummyQuestions;
    },
  },
});

export const {
  fillDummyQuestions,
  updateOptionText,
  updateOptionRadioOrDropdown,
  updateOptionCheckbox,
  updateEtcInput,
  clearChosenOptions,
  setFocusedQuestionAt,
  addDefaultQuestionAt,
  duplicateQuestionAt,
  removeQuestionAt,
  changeQuestionType,
  changeTitleAt,
  changeNthOptionAt,
  toggleRequiredAt,
  addOptionAt,
  removeOptionAt,
  setEtcAt,
  markAsError,
  unmarkAsError,
  updateErrorStatus,
  moveQuestion,
  clearForm,
} = contentSlice.actions;
