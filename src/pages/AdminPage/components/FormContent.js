import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "../../../redux/slices/titleSlice";
import {
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
  removeOptionAt,
} from "../../../redux/slices/contentSlice";
import {
  Space,
  Typography,
  Input,
  Button,
  Card,
  Select,
  Radio,
  Checkbox,
  Switch,
  Divider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { purple } from "@ant-design/colors";
import "antd/dist/antd.min.css";
import { OptionTextLong, OptionTextShort } from "./OptionText";
const { Option } = Select;
const { Text } = Typography;

export const FormContent = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(unfocusQuestionAt({ index }));
    });
  };

  const onClickDuplicateQuestion = (index) => {
    dispatch(duplicateQuestionAt({ index }));
    dispatch(unfocusQuestionAt({ index }));
  };

  const onClickRemoveQuestion = (index) => {
    dispatch(removeQuestionAt({ index }));
    if (questions.length === 0) return;
    if (index === 0) dispatch(focusQuestionAt(0));
    else dispatch(focusQuestionAt(index - 1));
  };
  const onClickAddQuestion = (index) => {
    dispatch(addDefaultQuestionAt({ index: index + 1 }));
    dispatch(unfocusQuestionAt({ index }));
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
  const onClickRemoveOption = ({ indexQuestion, indexOption }) => {
    dispatch(removeOptionAt({ indexQuestion, indexOption }));
  };

  return (
    <Space direction="vertical" size="large">
      {questions.map(
        ({ title, type, optionList, hasEtc, isRequired, isFocused }, index) => {
          return (
            <Card
              key={`question_${index}`}
              className="card"
              style={{
                position: "relative",
                width: 700,
                border: isFocused ? `1px solid ${purple.primary}` : "none",
              }}
              onClick={(e) => {
                if (
                  e.target.className === "duplicate" ||
                  e.target.className === "add" ||
                  e.target.className === "remove"
                ) {
                  return;
                }
                dispatch(unfocusTitleCard());
                unfocusAllQuestions();
                dispatch(focusQuestionAt({ index }));
              }}
            >
              {isFocused && (
                <button
                  onClick={() => {
                    onClickAddQuestion(index);
                  }}
                  style={{ position: "absolute", top: 0, right: "-12%" }}
                  className="add"
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
                        {title || "질문"}
                        {isRequired && <Text type="danger">*</Text>}
                      </Space>
                    </>
                  )}
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

                {/* 답변 목록 (단답형/장문형/체크박스 등등) */}
                {type === "textShort" && <OptionTextShort />}
                {type === "textLong" && <OptionTextLong />}
                {type === "radio" && (
                  <Radio.Group>
                    <Space direction="vertical">
                      {optionList.map((option, indexOption) => (
                        <Space style={{ fontSize: 14 }}>
                          <Radio disabled />
                          {isFocused ? (
                            <>
                              <Input
                                value={option}
                                onChange={(e) =>
                                  onChangeOption(e, index, indexOption)
                                }
                              />
                              {optionList.length > 1 && (
                                <CloseOutlined
                                  style={{ position: "absolute", right: 30 }}
                                  onClick={() =>
                                    onClickRemoveOption({
                                      indexQuestion: index,
                                      indexOption,
                                    })
                                  }
                                />
                              )}
                            </>
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
                {type === "checkbox" && (
                  <Space direction="vertical">
                    {optionList.map((option, indexOption) => (
                      <Space style={{ fontSize: 14 }}>
                        <Checkbox disabled />
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
                        <Checkbox disabled />
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
                )}
                {type === "dropdown" && (
                  <Space direction="vertical">
                    {optionList.map((option, indexOption) => (
                      <Space style={{ fontSize: 14 }}>
                        <Text>{indexOption + 1}</Text>
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
                        <Text>{optionList.length + 1}</Text>
                        <Button
                          type="dashed"
                          onClick={() => onClickAddOption(index)}
                        >
                          옵션 추가
                        </Button>
                      </Space>
                    )}
                  </Space>
                )}
                {/* 답변 목록 끝 */}

                {isFocused && (
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => onClickDuplicateQuestion(index)}
                      className="duplicate"
                    >
                      복사
                    </button>
                    <button
                      onClick={() => onClickRemoveQuestion(index)}
                      className="remove"
                    >
                      삭제
                    </button>
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
