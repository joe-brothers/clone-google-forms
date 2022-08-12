import { useDispatch } from "react-redux";
import { Button, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addDefaultQuestionAt, unfocusQuestionAt } from "../../../../redux/slices/contentSlice";
import { unfocusTitleCard } from "../../../../redux/slices/titleSlice";

export const ButtonAddQuestion = ({ indexQuestion, isTitle }) => {
  const dispatch = useDispatch();

  const onClickAddQuestion = (e, index) => {
    e.stopPropagation();
    if (isTitle) {
      dispatch(addDefaultQuestionAt({ index: 0 }));
      dispatch(unfocusTitleCard());
    } else {
      dispatch(addDefaultQuestionAt({ index: index + 1 }));
      dispatch(unfocusQuestionAt({ index }));
    }
  };

  return (
    <Tooltip title="질문 추가" placement="right">
      <Button
        size="large"
        style={{ position: "absolute", top: 0, right: "-9%" }}
        icon={<PlusCircleOutlined />}
        onClick={(e) => {
          onClickAddQuestion(e, indexQuestion);
        }}
      />
    </Tooltip>
  );
};
