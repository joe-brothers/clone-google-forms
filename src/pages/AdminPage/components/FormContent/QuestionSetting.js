import { useDispatch, useSelector } from "react-redux";
import { Divider, Space, Switch } from "antd";
import {
  duplicateQuestionAt,
  focusQuestionAt,
  removeQuestionAt,
  toggleRequiredAt,
  unfocusQuestionAt,
} from "../../../../redux/slices/contentSlice";
import "antd/dist/antd.min.css";

export const QuestionSetting = ({ indexQuestion, isRequired }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const onClickDuplicateQuestion = (index) => {
    dispatch(duplicateQuestionAt({ index }));
    dispatch(unfocusQuestionAt({ index }));
  };
  const onClickRemoveQuestion = (index) => {
    dispatch(removeQuestionAt({ index }));
    if (questions.length === 0) return;
    if (index === 0) dispatch(focusQuestionAt(0));
    else dispatch(focusQuestionAt(index - 1));
  };
  const onChangeRequired = (index) => {
    dispatch(toggleRequiredAt({ index }));
  };

  return (
    <>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <button
          onClick={() => onClickDuplicateQuestion(indexQuestion)}
          className="duplicate"
        >
          복사
        </button>
        <button
          onClick={() => onClickRemoveQuestion(indexQuestion)}
          className="remove"
        >
          삭제
        </button>
        <Divider type="vertical" />
        <Space>필수</Space>
        <Switch
          checked={isRequired}
          onChange={() => onChangeRequired(indexQuestion)}
        />
      </Space>
    </>
  );
};
