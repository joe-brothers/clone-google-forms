import { useDispatch } from "react-redux";
import { addDefaultQuestionAt, setFocusedQuestionAt } from "redux/slices/contentSlice";
import { setFocusedTitleCard } from "redux/slices/titleSlice";
import { Button, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const ButtonAddQuestion = ({ indexQuestion, isTitle }) => {
  const dispatch = useDispatch();

  // '질문 추가' 버튼을 눌렀을 때 실행되는 함수
  const onClickAddQuestion = (e, index) => {
    e.stopPropagation();
    // 제목에서 누를 경우 첫번째 질문이,
    // n번째 질문에서 누를 경우 n+1번째 질문이 추가된다.
    if (isTitle) {
      dispatch(addDefaultQuestionAt({ index: 0 }));
      dispatch(setFocusedTitleCard(false));
    } else {
      dispatch(addDefaultQuestionAt({ index: index + 1 }));
      dispatch(setFocusedQuestionAt({ index, focused: false }));
    }
  };

  return (
    <Tooltip title="질문 추가" placement="right">
      <Button
        id="form-button-add-question"
        size="large"
        style={{ zIndex: 10 }}
        icon={<PlusCircleOutlined />}
        onClick={(e) => {
          onClickAddQuestion(e, indexQuestion);
        }}
      />
    </Tooltip>
  );
};
