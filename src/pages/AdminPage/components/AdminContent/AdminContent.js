import { useDispatch, useSelector } from "react-redux";
import { unfocusTitleCard } from "redux/slices/titleSlice";
import { focusQuestionAt, unfocusQuestionAt, moveQuestion, setIndexFrom, setIndexTo } from "redux/slices/contentSlice";
import { Space, Typography, Card } from "antd";
import { purple } from "@ant-design/colors";
import { QuestionSetting } from "./components/QuestionSetting";
import { QuestionTitle } from "./components/QuestionTitle";
import { QuestionAnswers } from "./components/QuestionAnswers";
import { ButtonAddQuestion } from "./ButtonAddQuestion";
import "antd/dist/antd.min.css";
const { Text } = Typography;

export const AdminContent = () => {
  const dispatch = useDispatch();
  const { questions, dragData } = useSelector((state) => state.formContent);
  // const dragData = useSelector((state) => state.dragData);

  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(unfocusQuestionAt({ index }));
    });
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
      {questions.map(({ isFocused }, indexQuestion) => {
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
              <QuestionTitle indexQuestion={indexQuestion} />
              <QuestionAnswers indexQuestion={indexQuestion} />
              {isFocused && <QuestionSetting indexQuestion={indexQuestion} />}
            </Space>
          </Card>
        );
      })}
    </Space>
  );
};
