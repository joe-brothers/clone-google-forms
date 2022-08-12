import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Space, Switch } from "antd";
import {
  duplicateQuestionAt,
  focusQuestionAt,
  removeQuestionAt,
  toggleRequiredAt,
  unfocusQuestionAt,
} from "../../../../redux/slices/contentSlice";
import "antd/dist/antd.min.css";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

export const QuestionSetting = ({ indexQuestion, isRequired }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const onClickDuplicateQuestion = (e, index) => {
    e.stopPropagation();
    dispatch(duplicateQuestionAt({ index }));
    dispatch(unfocusQuestionAt({ index }));
  };
  const onClickRemoveQuestion = (e, index) => {
    e.stopPropagation();
    dispatch(removeQuestionAt({ index }));
    if (questions.length === 0) return;
    if (index === 0) dispatch(focusQuestionAt({ index: 0 }));
    else dispatch(focusQuestionAt({ index: index - 1 }));
  };
  const onChangeRequired = (index) => {
    dispatch(toggleRequiredAt({ index }));
  };

  return (
    <>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button
          icon={<CopyOutlined />}
          shape="circle"
          size="large"
          onClick={(e) => onClickDuplicateQuestion(e, indexQuestion)}
        />
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          size="large"
          onClick={(e) => onClickRemoveQuestion(e, indexQuestion)}
        />
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
