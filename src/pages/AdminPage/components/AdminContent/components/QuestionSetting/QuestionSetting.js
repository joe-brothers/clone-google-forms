import { useDispatch, useSelector } from "react-redux";
import {
  duplicateQuestionAt,
  removeQuestionAt,
  setFocusedQuestionAt,
  toggleRequiredAt,
} from "redux/slices/contentSlice";
import { Button, Divider, notification, Space, Switch, Tooltip } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

export const QuestionSetting = ({ indexQuestion }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const { isRequired } = questions[indexQuestion];

  // 질문 복제 버튼을 눌렀을 때 실행되는 함수
  const onClickDuplicateQuestion = (e, index) => {
    e.stopPropagation();
    dispatch(duplicateQuestionAt({ index }));
    dispatch(setFocusedQuestionAt({ index, focused: false }));
  };

  // 질문 삭제 버튼을 눌렀을 때 실행되는 함수
  const onClickRemoveQuestion = (e, index) => {
    e.stopPropagation();
    // 질문을 삭제합니다.
    dispatch(removeQuestionAt({ index }));
    // 왼쪽 하단에 알림창을 띄웁니다.
    notification.info({
      message: "항목을 삭제했습니다.",
      duration: 2,
      placement: "bottomLeft",
    });
    // 남은 질문 개수, 삭제한 질문의 인덱스에 따라 적절히 focus를 넣어줍니다.
    if (questions.length === 0) return;
    if (index === 0) dispatch(setFocusedQuestionAt({ index: 0, focused: true }));
    else dispatch(setFocusedQuestionAt({ index: index - 1, focused: true }));
  };

  // 필수 여부를 변경했을 때 실행되는 함수
  const onChangeRequired = (index) => {
    dispatch(toggleRequiredAt({ index }));
  };

  return (
    <>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Tooltip title="복사" placement="bottom">
          <Button
            icon={<CopyOutlined />}
            shape="circle"
            size="large"
            onClick={(e) => onClickDuplicateQuestion(e, indexQuestion)}
          />
        </Tooltip>
        <Tooltip title="삭제" placement="bottom">
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            size="large"
            onClick={(e) => onClickRemoveQuestion(e, indexQuestion)}
          />
        </Tooltip>
        <Divider type="vertical" />
        <Space>필수</Space>
        <Switch checked={isRequired} onChange={() => onChangeRequired(indexQuestion)} />
      </Space>
    </>
  );
};
