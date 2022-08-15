import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "redux/slices/titleSlice";
import { focusQuestionAt, unfocusQuestionAt, moveQuestion } from "redux/slices/contentSlice";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { QuestionSetting } from "./components/QuestionSetting";
import { QuestionTitle } from "./components/QuestionTitle";
import { QuestionAnswers } from "./components/QuestionAnswers";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import { Space, Card } from "antd";
import { purple } from "@ant-design/colors";
import { HolderOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

const DragHandle = SortableHandle(() => (
  <HolderOutlined
    rotate="90"
    style={{ display: "block", cursor: "pointer", fontSize: 20, color: "#aaa", marginTop: -15, marginBottom: 20 }}
  />
));

const SortableList = SortableContainer(({ children }) => {
  return <ul style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", padding: 0 }}>{children}</ul>;
});

const SortableItem = SortableElement(({ isFocused, indexQuestion, onClick }) => {
  return (
    <Card
      // key={`question_${indexQuestion}`}
      style={{
        position: "relative",
        boxShadow: `rgb(0 0 0 / ${isFocused ? 15 : 5}%) 0px 0px 10px 5px`,
        border: `2px solid ${isFocused ? purple.primary : "#e4e4e4"}`,
        borderRadius: 10,
        width: "100%",
      }}
      onClick={onClick}
    >
      {isFocused && <DragHandle />}
      {isFocused && <ButtonAddQuestion indexQuestion={indexQuestion} isTitle={false} />}
      <Space direction="vertical" style={{ width: "100%" }}>
        <QuestionTitle indexQuestion={indexQuestion} />
        <QuestionAnswers indexQuestion={indexQuestion} />
        {isFocused && <QuestionSetting indexQuestion={indexQuestion} />}
      </Space>
    </Card>
  );
});

export const AdminContent = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(unfocusQuestionAt({ index }));
    });
  };

  const onClickQuestion = ({ index }) => {
    dispatch(unfocusTitleCard());
    unfocusAllQuestions();
    dispatch(focusQuestionAt({ index }));
  };

  const onSortEndQuestion = ({ oldIndex, newIndex }) => {
    dispatch(moveQuestion({ oldIndex, newIndex }));
  };

  return (
    <SortableList onSortEnd={onSortEndQuestion} useDragHandle>
      {questions.map(({ isFocused }, indexQuestion) => (
        <SortableItem
          key={`question_${indexQuestion}`}
          index={indexQuestion}
          indexQuestion={indexQuestion}
          isFocused={isFocused}
          onClick={() => onClickQuestion({ index: indexQuestion })}
        />
      ))}
    </SortableList>
  );
};
