import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateDescription, setFocusedTitleCard } from "redux/slices/titleSlice";
import { setFocusedQuestionAt } from "redux/slices/contentSlice";
import { ButtonAddQuestion } from "../AdminContent/ButtonAddQuestion";
import { Typography, Input, Card } from "antd";
import { purple } from "@ant-design/colors";
const { Text, Title } = Typography;

export const AdminTitle = () => {
  const dispatch = useDispatch();
  const { title, description, isFocused } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  // 모든 질문 카드의 포커스를 없애는 함수
  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(setFocusedQuestionAt({ index, focused: false }));
    });
  };

  return (
    <Card
      style={{
        border: `2px solid ${isFocused ? purple.primary : "#e4e4e4"}`,
        borderRadius: 10,
        boxShadow: `rgb(0 0 0 / ${isFocused ? 15 : 5}%) 0px 0px 10px 5px`,
        width: "100%",
      }}
      onClick={() => {
        unfocusAllQuestions();
        dispatch(setFocusedTitleCard(true));
      }}
    >
      {isFocused ? (
        <Input
          size="large"
          placeholder="설문지 제목"
          value={title}
          style={{ fontSize: 30 }}
          onChange={(e) => {
            dispatch(updateTitle({ title: e.target.value }));
          }}
        />
      ) : (
        <Title level={2}>{title || "제목 없는 설문지"}</Title>
      )}
      {isFocused ? (
        <Input
          placeholder="설문지 설명"
          value={description}
          onChange={(e) => {
            dispatch(updateDescription({ description: e.target.value }));
          }}
        />
      ) : (
        <Text>{description || "설문지 설명"}</Text>
      )}
      {isFocused && <ButtonAddQuestion isTitle={true} />}
    </Card>
  );
};
