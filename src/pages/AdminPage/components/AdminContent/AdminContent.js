import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "redux/slices/titleSlice";
import {
  focusQuestionAt,
  unfocusQuestionAt,
  changeQuestionType,
  changeTitleAt,
  addOptionAt,
  moveQuestion,
  setIndexFrom,
  setIndexTo,
} from "redux/slices/contentSlice";
import { Space, Typography, Input, Button, Card, Select, Radio, Checkbox, Divider, Dropdown, Menu } from "antd";
import { purple, grey } from "@ant-design/colors";
import { OptionTextLong, OptionTextShort } from "./OptionText";
import { EtcChoice } from "./EtcChoice";
import { AddOptionOrEtc } from "./AddOptionOrEtc";
import { InputSentence } from "./InputSentence";
import { QuestionSetting } from "./QuestionSetting";
import "antd/dist/antd.min.css";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import { OptionChoices } from "./OptionChoices";
import { DownOutlined } from "@ant-design/icons";
import { questionTypeMenuItems, typeMatchObject } from "utils/objects";
const { Option } = Select;
const { Text } = Typography;

export const AdminContent = () => {
  const dispatch = useDispatch();
  const { questions, dragData } = useSelector((state) => state.formContent);
  // const dragData = useSelector((state) => state.dragData);

  const questionTypeMenu = (indexQuestion) => {
    return (
      <Menu
        onClick={({ key }) => {
          dispatch(changeQuestionType({ type: key, index: indexQuestion }));
        }}
        items={questionTypeMenuItems}
      />
    );
  };

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

  const getCoordinatesOfQuestions = () => {
    return [...new Array(questions.length).keys()].map((index) => {
      return {
        top: document.querySelectorAll(".draggable")[index].getBoundingClientRect().top,
        bottom:
          document.querySelectorAll(".draggable")[index].getBoundingClientRect().top +
          document.querySelectorAll(".draggable")[index].getBoundingClientRect().height,
      };
    });
  };

  const onDragStartQuestion = (e) => {
    const questionCoords = getCoordinatesOfQuestions();
    for (let i = 0; i < questions.length; i++) {
      if (questionCoords[i].top <= e.pageY && e.pageY <= questionCoords[i].bottom) {
        dispatch(setIndexFrom({ indexFrom: i }));
        console.log(`from ${i}`);
      }
    }
  };

  const onDropQuestion = (e) => {
    const questionCoords = getCoordinatesOfQuestions();
    for (let i = 0; i < questions.length; i++) {
      if (questionCoords[i].top <= e.pageY && e.pageY <= questionCoords[i].bottom) {
        dispatch(setIndexTo({ indexTo: i }));
        console.log(`to ${i}`);
      }
    }
    dispatch(moveQuestion());
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {questions.map(({ title, type, optionList, hasEtc, isRequired, isFocused }, indexQuestion) => {
        return (
          <Card
            key={`question_${indexQuestion}`}
            style={{
              position: "relative",
              boxShadow: `rgb(0 0 0 / ${isFocused ? 15 : 5}%) 0px 0px 10px 5px`,
              border: `2px solid ${isFocused ? purple.primary : "#e4e4e4"}`,
              borderRadius: 10,
              width: "100%",
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
              <div
                style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}
              >
                {isFocused ? (
                  <>
                    <Input
                      id="form-input"
                      size="large"
                      placeholder="질문"
                      value={title}
                      onChange={(e) => onChangeTitle(e, indexQuestion)}
                    />
                    <Dropdown overlay={questionTypeMenu(indexQuestion)} trigger="click">
                      <Button style={{ width: 150 }}>
                        <Space style={{ width: "100%", justifyContent: "space-between" }}>
                          {typeMatchObject[type]}
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </>
                ) : (
                  <Space style={{ fontSize: 16 }}>
                    {title || "질문"}
                    {isRequired && <Text type="danger">*</Text>}
                  </Space>
                )}
              </div>

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
