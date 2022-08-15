import { useDispatch, useSelector } from "react-redux";
import { setFocusedTitleCard } from "redux/slices/titleSlice";
import { moveQuestion, setFocusedQuestionAt } from "redux/slices/contentSlice";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { QuestionSetting } from "./components/QuestionSetting";
import { QuestionTitle } from "./components/QuestionTitle";
import { QuestionAnswers } from "./components/QuestionAnswers";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import { Space, Card } from "antd";
import { purple } from "@ant-design/colors";
import { HolderOutlined } from "@ant-design/icons";

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

  // 모든 질문 카드의 포커스를 없애는 함수
  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(setFocusedQuestionAt({ index, focused: false }));
    });
  };

  // 질문 카드를 눌렀을 때 해당 질문 카드에 포커스를 주는 함수
  const onClickQuestion = ({ index }) => {
    dispatch(setFocusedTitleCard(false));
    unfocusAllQuestions();
    dispatch(setFocusedQuestionAt({ index, focused: true }));
  };

  // 드래그앤 드롭으로 질문을 이동했을 때 실행되는 함수
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
