import { useDispatch, useSelector } from "react-redux";
import {
  focusTitleCard,
  updateTitle,
  updateDescription,
} from "../../../redux/slices/titleSlice";
import { unfocusQuestionAt } from "../../../redux/slices/contentSlice";
import { Typography, Input, Card } from "antd";
import { purple } from "@ant-design/colors";
import "antd/dist/antd.min.css";
const { Text, Title } = Typography;

export const FormTitle = () => {
  const dispatch = useDispatch();
  const { title, description, isFocused } = useSelector(
    (state) => state.formTitle
  );
  const { questions } = useSelector((state) => state.formContent);

  const unfocusAllQuestions = () => {
    if (questions.length === 0) return;
    [...Array(questions.length).keys()].forEach((index) => {
      dispatch(unfocusQuestionAt({ index }));
    });
  };

  return (
    <Card
      style={{
        border: isFocused ? `1px solid ${purple.primary}` : "none",
        width: 700,
      }}
      onClick={() => {
        unfocusAllQuestions();
        dispatch(focusTitleCard());
      }}
    >
      {isFocused ? (
        <Input
          size="large"
          placeholder="설문지 제목"
          value={title}
          onChange={(e) => {
            dispatch(updateTitle({ title: e.target.value }));
          }}
        />
      ) : (
        <Title level={3}>{title || "제목 없는 설문지"}</Title>
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
    </Card>
  );
};
