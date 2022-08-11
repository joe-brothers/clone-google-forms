import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTitle, updateDescription } from "../redux/slices/titleSlice";
import {
  unfocusAllQuestions,
  focusQuestionAt,
  addDefaultQuestion,
  addDefaultQuestionAt,
  duplicateQuestionAt,
  removeQuestionAt,
  changeQuestionType,
  changeTitleAt,
  changeNthOptionAt,
  toggleRequiredAt,
  addOptionAt,
} from "../redux/slices/contentSlice";
import {
  Space,
  Typography,
  Input,
  Button,
  Card,
  Select,
  Radio,
  Switch,
  Divider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRef } from "react";
import "antd/dist/antd.min.css";
import { purple } from "@ant-design/colors";
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addRef = useRef();
  const questionsRef = useRef([]);
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const onClickPreview = () => {
    navigate("/preview", { state: { title, description } });
  };

  const onClickDuplicate = (index) => {
    dispatch(duplicateQuestionAt({ index }));
  };
  const onClickRemove = (index) => {
    dispatch(removeQuestionAt({ index }));
  };
  const onChangeTitle = (e, index) => {
    dispatch(changeTitleAt({ index, title: e.target.value }));
  };
  const onChangeOption = (e, indexQuestion, indexOption) => {
    dispatch(
      changeNthOptionAt({
        indexQuestion,
        indexOption,
        option: e.target.value,
      })
    );
  };
  const onChangeRequired = (index) => {
    dispatch(toggleRequiredAt({ index }));
  };
  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", position: "relative" }}
    >
      <button onClick={onClickPreview}>미리보기</button>

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
        (
          { title, type, answer, optionList, hasEtc, isRequired, isFocused },
          index
        ) => {
          return (
            <Card
              key={`question_${index}`}
              style={{
                position: "relative",
                width: 700,
                border: isFocused ? `1px solid ${purple.primary}` : "none",
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
                  {isFocused ? (
                    <Input
                      size="large"
                      placeholder="질문"
                      value={title}
                      onChange={(e) => onChangeTitle(e, index)}
                    />
                  ) : (
                    <>
                      <Space style={{ fontSize: 16 }}>
                        {title}
                        {isRequired && <Text type="danger">*</Text>}
                      </Space>
                    </>
                  )}
                  <Select
                    defaultValue={type}
                    onSelect={(type) => {
                      console.log(type);
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

                {/* 답변 목록 (단답형/장문형/체크박스 등등) */}
                {type === "textShort" && (
                  <Input
                    disabled
                    style={{ width: "50%" }}
                    placeholder="단답형 텍스트"
                  />
                )}
                {type === "textLong" && (
                  <TextArea disabled autoSize placeholder="장문형 텍스트" />
                )}
                {type === "radio" && (
                  <Radio.Group>
                    <Space direction="vertical">
                      {optionList.map((option, indexOption) => (
                        <Space>
                          <Radio disabled />
                          {isFocused ? (
                            <Input
                              value={option}
                              onChange={(e) =>
                                onChangeOption(e, index, indexOption)
                              }
                            />
                          ) : (
                            <Text>{option}</Text>
                          )}
                        </Space>
                      ))}
                      {isFocused && (
                        <Space>
                          <Radio disabled />
                          <Button
                            type="dashed"
                            onClick={() => onClickAddOption(index)}
                          >
                            옵션 추가
                          </Button>
                          {!hasEtc && <Button type="link">기타 추가</Button>}
                        </Space>
                      )}
                    </Space>
                  </Radio.Group>
                )}
                {isFocused && (
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <button onClick={() => onClickDuplicate(index)}>
                      복사
                    </button>
                    <button onClick={() => onClickRemove(index)}>삭제</button>
                    <Divider type="vertical" />
                    <Space>필수</Space>
                    <Switch
                      checked={isRequired}
                      onChange={() => onChangeRequired(index)}
                    />
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
