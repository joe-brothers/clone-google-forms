import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTitle, updateDescription } from "../redux/slices/titleSlice";
import {
  unfocusAllQuestions,
  focusQuestionAt,
  addDefaultQuestion,
  addDefaultQuestionAt,
  copyQuestionAt,
  removeQuestionAt,
  changeQuestionType,
  changeTitleAt,
  addOptionAt,
} from "../redux/slices/contentSlice";
import { Space, Input, Card, Select, Radio } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { useEffect, useRef } from "react";
const { Option } = Select;

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addRef = useRef();
  const questionsRef = useRef([]);
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const onPreviewClick = () => {
    navigate("/preview", { state: { title, description } });
  };

  const onCopyClick = (index) => {
    dispatch(copyQuestionAt({ index }));
  };
  const onRemoveClick = (index) => {
    dispatch(removeQuestionAt({ index }));
  };
  const onChangeTitle = (e, index) => {
    dispatch(changeTitleAt({ index, title: e.target.value }));
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", position: "relative" }}
    >
      <button onClick={onPreviewClick}>미리보기</button>

      <Card style={{ width: 700 }}>
        <Input
          size="large"
          placeholder="설문지 제목"
          value={title}
          onChange={(e) => {
            dispatch(updateTitle({ title: e.target.value }));
          }}
        />
        <Input
          placeholder="설문지 설명"
          onChange={(e) => {
            dispatch(updateDescription({ description: e.target.value }));
          }}
        />
      </Card>
      {questions.map(
        ({ title, type, answer, isRequired, isFocused }, index) => {
          return (
            <Card
              key={`question_${index}`}
              style={{
                position: "relative",
                width: 700,
                border: isFocused ? "1px solid blue" : "none",
              }}
              onClick={() => dispatch(focusQuestionAt({ index }))}
            >
              {isFocused && (
                <button
                  onClick={() => {
                    dispatch(unfocusAllQuestions());
                    dispatch(addDefaultQuestionAt({ index: index + 1 }));
                  }}
                  style={{ position: "absolute", top: 0, right: "-12%" }}
                >
                  질문 추가
                </button>
              )}
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Input
                    size="large"
                    placeholder="질문"
                    value={title}
                    onChange={(e) => onChangeTitle(e, index)}
                  />
                  <Select
                    defaultValue={type}
                    onSelect={(type) => {
                      dispatch(changeQuestionType({ type, index }));
                    }}
                    style={{ width: 120 }}
                  >
                    <Option value="textShort">단답형</Option>
                    <Option value="textLong">장문형</Option>
                    <Option value="radio">객관식 질문</Option>
                    <Option value="checkbox">체크박스</Option>
                    <Option value="dropdown">드롭다운</Option>
                  </Select>
                </Space>
                {answer}
                {isFocused && (
                  <Space style={{ width: "100%" }}>
                    <button onClick={() => onCopyClick(index)}>복사</button>
                    <button onClick={() => onRemoveClick(index)}>삭제</button>
                    <button>필수</button>
                  </Space>
                )}
              </Space>
            </Card>
          );
        }
      )}
    </Space>
  );
};
