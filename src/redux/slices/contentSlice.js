import { createSlice } from "@reduxjs/toolkit";
import { Space, Input, Card, Select, Radio, Checkbox, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { TextArea } = Input;

const DEFAULT_OPTIONS = {
  textShort: (
    <Input disabled style={{ width: "50%" }} placeholder="단답형 텍스트" />
  ),
  textLong: <TextArea disabled autoSize placeholder="장문형 텍스트" />,
  radio: (
    <Radio.Group>
      <Space direction="vertical">
        <Space>
          <Radio disabled />
          <Input value="옵션 1" />
        </Space>
        <Space>
          <Radio disabled />
          <Button type="dashed">옵션 추가</Button>
          <Button type="link">기타 추가</Button>
        </Space>
      </Space>
    </Radio.Group>
  ),
  checkbox: (
    <Space direction="vertical">
      <Space>
        <Checkbox disabled />
        <Input value="옵션 1" />
      </Space>
      <Space>
        <Checkbox disabled />
        <Button type="dashed">옵션 추가</Button>
        <Button type="link">기타 추가</Button>
      </Space>
    </Space>
  ),
  dropdown: (
    <Space direction="vertical">
      <Space>
        <Space>1</Space>
        <Input value="옵션 1" />
      </Space>
      <Space>
        <Space>2</Space>
        <Button type="dashed">옵션 추가</Button>
      </Space>
    </Space>
  ),
};

export const contentSlice = createSlice({
  name: "contentSlice",
  initialState: {
    questions: [
      {
        title: "제목없는 질문",
        type: "radio",
        options: DEFAULT_OPTIONS.radio,
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
    changeType: (state, action) => {
      const { type, index } = action.payload;
      state.questions[index].options = DEFAULT_OPTIONS[type];
    },
    addDefaultQuestion: (state, action) => {
      let defaultQuestion = {
        title: "",
        type: "radio",
        options: [{ isEtc: false, optionTitle: "옵션 1" }],
        isRequired: false,
        isFocused: true,
      };
    },
  },
});

export const { unfocusAllQuestions, changeType, addDefaultQuestion } =
  contentSlice.actions;
