import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, updateErrorStatus } from "redux/slices/contentSlice";
import { Space, Button, Modal } from "antd";

export const PreviewButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOn, setIsModalOn] = useState(false);
  const { questions } = useSelector((state) => state.formContent);

  // '제출' 버튼을 눌렀을 떄 실행되는 함수
  const onClickSubmit = () => {
    // 에러 상태를 확인해서 에러인 경우 에러 메시지를 띄우고, 에러 갯수를 센다.
    let errorNum = 0;
    questions.forEach((question, indexQuestion) => {
      dispatch(updateErrorStatus({ indexQuestion }));
      if (question.isRequired && (question.chosenOptions.length === 0 || question.chosenOptions[0] === "")) {
        errorNum += 1;
      }
    });

    // 에러가 없어야 제출 화면으로 이동한다.
    if (errorNum === 0) {
      navigate("/submit");
    }
  };

  // '뒤로 가기' 버튼을 눌렀을 때 실행되는 함수
  const onClickGoBack = () => {
    navigate("/");
  };

  // '양식 지우기' 버튼을 누르고 모달 'OK'를 눌렀을 때 실행되는 함수
  const onClickClearForm = () => {
    dispatch(clearForm());
    setIsModalOn(false);
  };

  return (
    <>
      <article style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Button type="primary" style={{ width: 70 }} onClick={onClickSubmit}>
            제출
          </Button>
          <Button onClick={onClickGoBack}>뒤로 가기</Button>
        </Space>
        <Button type="link" onClick={() => setIsModalOn(true)}>
          양식 지우기
        </Button>
      </article>
      <Modal
        centered
        visible={isModalOn}
        title="양식을 지우시겠습니까? 🫢"
        onOk={onClickClearForm}
        onCancel={() => setIsModalOn(false)}
      >
        <p>모든 질문에서 답변이 삭제되며 되돌릴 수 없습니다. 🫥</p>
      </Modal>
    </>
  );
};
