import { createSlice } from "@reduxjs/toolkit";
import { Space, Input, Card, Select, Radio, Checkbox, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { TextArea } = Input;

const getAnswer = (type, optionList, hasEtc) => {
  switch (type) {
    case "textShort":
      return (
        <Input disabled style={{ width: "50%" }} placeholder="단답형 텍스트" />
      );
    case "textLong":
      return <TextArea disabled autoSize placeholder="장문형 텍스트" />;
    case "radio":
      return (
        <Radio.Group>
          <Space direction="vertical">
            {optionList.map((option) => (
              <Space>
                <Radio disabled />
                <Input value={option} />
              </Space>
            ))}
            <Space>
              <Radio disabled />
              <Button type="dashed">옵션 추가</Button>
              {!hasEtc && <Button type="link">기타 추가</Button>}
            </Space>
          </Space>
        </Radio.Group>
      );
    case "checkbox":
      return (
        <Space direction="vertical">
          {optionList.map((option) => (
            <Space>
              <Checkbox disabled />
              <Input value={option} />
            </Space>
          ))}
          <Space>
            <Checkbox disabled />
            <Button type="dashed">옵션 추가</Button>
            {!hasEtc && <Button type="link">기타 추가</Button>}
          </Space>
        </Space>
      );
    case "dropdown":
      return (
        <Space direction="vertical">
          {optionList.map((option, index) => (
            <Space>
              <Space>{index + 1}</Space>
              <Input value={option} />
            </Space>
          ))}
          <Space>
            <Space>{optionList.length + 1}</Space>
            <Button type="dashed">옵션 추가</Button>
          </Space>
        </Space>
      );
    default:
      break;
  }
};

export const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    questions: [
      {
        title: "제목없는 질문",
        type: "radio",
        answer: getAnswer("radio", ["옵션 1"], false),
        optionList: ["옵션 1"],
        hasEtc: false,
        isRequired: false,
        isFocused: true,
      },
    ],
  },
  reducers: {
    unfocusAllQuestions: (state, action) => {
      state.questions.forEach((question) => {
        question.isFocused = false;
      });
    },
    focusQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions.forEach((question) => {
        question.isFocused = false;
      });
      state.questions[index].isFocused = true;
    },
    addDefaultQuestion: (state, action) => {
      let defaultQuestion = {
        title: "",
        type: "radio",
        answer: getAnswer("radio", ["옵션 1"], false),
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
        answer: getAnswer("radio", ["옵션 1"], false),
        optionList: ["옵션 1"],
        hasEtc: false,
        isRequired: false,
        isFocused: true,
      };
      state.questions.splice(index, 0, defaultQuestion);
    },
    copyQuestionAt: (state, action) => {
      const { index } = action.payload;
      let copyedQuestion = state.questions[index];
      state.questions.splice(index + 1, 0, copyedQuestion);
    },
    removeQuestionAt: (state, action) => {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },
    changeQuestionType: (state, action) => {
      const { type, index } = action.payload;
      const { optionList, hasEtc } = state.questions[index];
      state.questions[index].type = type;
      state.questions[index].answer = getAnswer(type, optionList, hasEtc);
    },
    changeTitleAt: (state, action) => {
      const { index, title } = action.payload;
      state.questions[index].title = title;
    },
    addOptionAt: (state, action) => {
      const { index } = action.payload;
      state.questions[index].optionList.push(
        `옵션 ${state.questions[index].optionList.length + 1}`
      );
    },
  },
});

export const {
  unfocusAllQuestions,
  focusQuestionAt,
  addDefaultQuestion,
  addDefaultQuestionAt,
  copyQuestionAt,
  removeQuestionAt,
  changeQuestionType,
  changeTitleAt,
  addOptionAt,
} = contentSlice.actions;
