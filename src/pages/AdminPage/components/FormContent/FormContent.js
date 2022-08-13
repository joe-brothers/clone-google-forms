import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "../../../../redux/slices/titleSlice";
import {
  focusQuestionAt,
  unfocusQuestionAt,
  changeQuestionType,
  changeTitleAt,
  addOptionAt,
  moveQuestion,
} from "../../../../redux/slices/contentSlice";
import { Space, Typography, Input, Button, Card, Select, Radio, Checkbox } from "antd";
import { purple, grey } from "@ant-design/colors";
import { OptionTextLong, OptionTextShort } from "./OptionText";
import { EtcChoice } from "./EtcChoice";
import { AddOptionOrEtc } from "./AddOptionOrEtc";
import { InputSentence } from "./InputSentence";
import { QuestionSetting } from "./QuestionSetting";
import "antd/dist/antd.min.css";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import { OptionChoices } from "./OptionChoices";
import { setIndexDragStart, setIndexDrop } from "../../../../redux/slices/dragSlice";
const { Option } = Select;
const { Text } = Typography;

export const FormContent = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const dragData = useSelector((state) => state.dragData);

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

  const getCoordinatesOfQuestions = (length) => {
    return [...new Array(length).keys()].map((index) => {
      return {
        top: document.querySelectorAll(".draggable")[index].getBoundingClientRect().top,
        bottom:
          document.querySelectorAll(".draggable")[index].getBoundingClientRect().top +
          document.querySelectorAll(".draggable")[index].getBoundingClientRect().height,
      };
    });
  };

  const onDragStartQuestion = (e) => {
    console.log("drag start");

    const questionCoords = getCoordinatesOfQuestions(questions.length);
    for (let i = 0; i < questions.length; i++) {
      if (questionCoords[i].top <= e.pageY && e.pageY <= questionCoords[i].bottom) {
        dispatch(setIndexDragStart({ index: i }));
      }
    }
  };

  const onDropQuestion = (e) => {
    console.log("drop");

    const questionCoords = getCoordinatesOfQuestions(questions.length);
    for (let i = 0; i < questions.length; i++) {
      if (questionCoords[i].top <= e.pageY && e.pageY <= questionCoords[i].bottom) {
        dispatch(setIndexDrop({ index: i }));
      }
    }
    dispatch(moveQuestion({ indexFrom: dragData.indexDragStart, indexTo: dragData.indexDrop }));
  };

  return (
    <Space direction="vertical" size="large">
      {questions.map(({ title, type, optionList, hasEtc, isRequired, isFocused }, indexQuestion) => {
        return (
          <Card
            key={`question_${indexQuestion}`}
            style={{
              position: "relative",
              boxShadow: `rgb(0 0 0 / ${isFocused ? 15 : 5}%) 0px 0px 10px 5px`,
              border: `2px solid ${isFocused ? purple.primary : "#e4e4e4"}`,
              borderRadius: 10,
              width: 700,
            }}
            onClick={() => {
              dispatch(unfocusTitleCard());
              unfocusAllQuestions();
              dispatch(focusQuestionAt({ index: indexQuestion }));
            }}
            className="draggable"
            draggable={true}
            onDragStart={onDragStartQuestion}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropQuestion}
          >
            {isFocused && <ButtonAddQuestion indexQuestion={indexQuestion} isTitle={false} />}
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                {isFocused ? (
                  <>
                    <Input
                      size="large"
                      placeholder="질문"
                      value={title}
                      onChange={(e) => onChangeTitle(e, indexQuestion)}
                      style={{ width: 400 }}
                    />
                    <Select
                      value={type}
                      onSelect={(type) => {
                        dispatch(changeQuestionType({ type, index: indexQuestion }));
                      }}
                      style={{ width: 120 }}
                    >
                      <Option value="textShort">단답형</Option>
                      <Option value="textLong">장문형</Option>
                      <Option value="radio">객관식 질문</Option>
                      <Option value="checkbox">체크박스</Option>
                      <Option value="dropdown">드롭다운</Option>
                    </Select>
                  </>
                ) : (
                  <Space style={{ fontSize: 16 }}>
                    {title || "질문"}
                    {isRequired && <Text type="danger">*</Text>}
                  </Space>
                )}
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
                    <EtcChoice ComponentToCheck={<Radio disabled />} isFocused={isFocused} index={indexQuestion} />
                  )}
                  {isFocused && (
                    <AddOptionOrEtc ComponentToCheck={<Radio disabled />} hasEtc={hasEtc} index={indexQuestion} />
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
                    <EtcChoice ComponentToCheck={<Checkbox disabled />} isFocused={isFocused} index={indexQuestion} />
                  )}
                  {isFocused && (
                    <AddOptionOrEtc ComponentToCheck={<Checkbox disabled />} hasEtc={hasEtc} index={indexQuestion} />
                  )}
                </Space>
              )}
              {type === "dropdown" && (
                <Space direction="vertical">
                  {optionList.map((option, indexOption) => (
                    <Space style={{ fontSize: 14 }} key={`q_${indexQuestion}_${indexOption}`}>
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
                      <Button type="dashed" onClick={() => onClickAddOption(indexQuestion)}>
                        옵션 추가
                      </Button>
                    </Space>
                  )}
                </Space>
              )}
              {/* 답변 목록 끝 */}

              {isFocused && <QuestionSetting indexQuestion={indexQuestion} isRequired={isRequired} />}
            </Space>
          </Card>
        );
      })}
    </Space>
  );
};
