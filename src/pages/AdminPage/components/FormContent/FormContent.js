import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "../../../../redux/slices/titleSlice";
import {
  focusQuestionAt,
  unfocusQuestionAt,
  addDefaultQuestionAt,
  changeQuestionType,
  changeTitleAt,
  addOptionAt,
} from "../../../../redux/slices/contentSlice";
import {
  Space,
  Typography,
  Input,
  Button,
  Card,
  Select,
  Radio,
  Checkbox,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { purple, grey } from "@ant-design/colors";
import { OptionTextLong, OptionTextShort } from "./OptionText";
import { EtcSentence } from "./EtcSentence";
import { AddOptionOrEtc } from "./AddOptionOrEtc";
import { InputSentence } from "./InputSentence";
import { QuestionSetting } from "./QuestionSetting";
import "antd/dist/antd.min.css";
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

  const onClickAddQuestion = (index) => {
    dispatch(addDefaultQuestionAt({ index: index + 1 }));
    dispatch(unfocusQuestionAt({ index }));
  };
  const onChangeTitle = (e, index) => {
    dispatch(changeTitleAt({ index, title: e.target.value }));
  };

  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };

  return (
    <Space direction="vertical" size="large">
      {questions.map(
        (
          { title, type, optionList, hasEtc, isRequired, isFocused },
          indexQuestion
        ) => {
          return (
            <Card
              key={`question_${indexQuestion}`}
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
                dispatch(focusQuestionAt({ index: indexQuestion }));
              }}
            >
              {isFocused && (
                <button
                  onClick={() => {
                    onClickAddQuestion(indexQuestion);
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
                      onChange={(e) => onChangeTitle(e, indexQuestion)}
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
                      dispatch(
                        changeQuestionType({ type, index: indexQuestion })
                      );
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
                  <Space direction="vertical">
                    {optionList.map((option, indexOption) => (
                      <Space style={{ fontSize: 14 }}>
                        <Radio disabled />
                        {isFocused ? (
                          <InputSentence
                            optionList={optionList}
                            option={option}
                            indexOption={indexOption}
                            indexQuestion={indexQuestion}
                          />
                        ) : (
                          <Text>{option}</Text>
                        )}
                      </Space>
                    ))}
                    {hasEtc && (
                      <EtcSentence
                        ComponentToCheck={Radio}
                        isFocused={isFocused}
                        index={indexQuestion}
                      />
                    )}
                    {isFocused && (
                      <AddOptionOrEtc
                        ComponentToCheck={Radio}
                        hasEtc={hasEtc}
                        index={indexQuestion}
                      />
                    )}
                  </Space>
                )}
                {type === "checkbox" && (
                  <Space direction="vertical">
                    {optionList.map((option, indexOption) => (
                      <Space style={{ fontSize: 14 }}>
                        <Checkbox disabled />
                        {isFocused ? (
                          <InputSentence
                            optionList={optionList}
                            option={option}
                            indexOption={indexOption}
                            indexQuestion={indexQuestion}
                          />
                        ) : (
                          <Text>{option}</Text>
                        )}
                      </Space>
                    ))}
                    {hasEtc && (
                      <EtcSentence
                        ComponentToCheck={Checkbox}
                        isFocused={isFocused}
                        index={indexQuestion}
                      />
                    )}
                    {isFocused && (
                      <AddOptionOrEtc
                        ComponentToCheck={Checkbox}
                        hasEtc={hasEtc}
                        index={indexQuestion}
                      />
                    )}
                  </Space>
                )}
                {type === "dropdown" && (
                  <Space direction="vertical">
                    {optionList.map((option, indexOption) => (
                      <Space style={{ fontSize: 14 }}>
                        <Text>{indexOption + 1}</Text>
                        {isFocused ? (
                          <InputSentence
                            optionList={optionList}
                            option={option}
                            indexOption={indexOption}
                            indexQuestion={indexQuestion}
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
                          onClick={() => onClickAddOption(indexQuestion)}
                        >
                          옵션 추가
                        </Button>
                      </Space>
                    )}
                  </Space>
                )}
                {/* 답변 목록 끝 */}

                {isFocused && (
                  <QuestionSetting
                    indexQuestion={indexQuestion}
                    isRequired={isRequired}
                  />
                )}
              </Space>
            </Card>
          );
        }
      )}
    </Space>
  );
};
