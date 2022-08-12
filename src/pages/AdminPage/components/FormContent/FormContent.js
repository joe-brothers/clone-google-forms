import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "../../../../redux/slices/titleSlice";
import {
  focusQuestionAt,
  unfocusQuestionAt,
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
import { purple, grey } from "@ant-design/colors";
import { OptionTextLong, OptionTextShort } from "./OptionText";
import { EtcChoice } from "./EtcChoice";
import { AddOptionOrEtc } from "./AddOptionOrEtc";
import { InputSentence } from "./InputSentence";
import { QuestionSetting } from "./QuestionSetting";
import "antd/dist/antd.min.css";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import { OptionChoices } from "./OptionChoices";
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
              style={{
                position: "relative",
                width: 700,
                border: isFocused ? `1px solid ${purple.primary}` : "none",
              }}
              onClick={(e) => {
                dispatch(unfocusTitleCard());
                unfocusAllQuestions();
                dispatch(focusQuestionAt({ index: indexQuestion }));
              }}
            >
              {isFocused && (
                <ButtonAddQuestion
                  indexQuestion={indexQuestion}
                  isTitle={false}
                />
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
                    <OptionChoices
                      ComponentToCheck={<Radio disabled />}
                      optionList={optionList}
                      indexQuestion={indexQuestion}
                      isFocused={isFocused}
                    />
                    {hasEtc && (
                      <EtcChoice
                        ComponentToCheck={<Radio disabled />}
                        isFocused={isFocused}
                        index={indexQuestion}
                      />
                    )}
                    {isFocused && (
                      <AddOptionOrEtc
                        ComponentToCheck={<Radio disabled />}
                        hasEtc={hasEtc}
                        index={indexQuestion}
                      />
                    )}
                  </Space>
                )}
                {type === "checkbox" && (
                  <Space direction="vertical">
                    <OptionChoices
                      ComponentToCheck={<Checkbox disabled />}
                      optionList={optionList}
                      indexQuestion={indexQuestion}
                      isFocused={isFocused}
                    />
                    {hasEtc && (
                      <EtcChoice
                        ComponentToCheck={<Checkbox disabled />}
                        isFocused={isFocused}
                        index={indexQuestion}
                      />
                    )}
                    {isFocused && (
                      <AddOptionOrEtc
                        ComponentToCheck={<Checkbox disabled />}
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
