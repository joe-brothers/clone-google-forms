import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, updateErrorStatus } from "redux/slices/contentSlice";
import { CardTitle } from "components/CardTitle";
import { CardContents } from "components/CardContents";
import { Space, Button, Modal } from "antd";
import "antd/dist/antd.min.css";
import { useState } from "react";

export const PreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const [isModalOn, setIsModalOn] = useState(false);

  const onClickSubmit = () => {
    let errorNum = 0;
    questions.forEach((question, indexQuestion) => {
      dispatch(updateErrorStatus({ indexQuestion }));
      if (question.isRequired && (question.chosenOptions.length === 0 || question.chosenOptions[0] === "")) {
        errorNum += 1;
      }
    });

    if (errorNum === 0) {
      navigate("/submit");
    }
  };

  const onClickGoBack = () => {
    navigate("/");
  };

  const onClickClearForm = () => {
    dispatch(clearForm());
    setIsModalOn(false);
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex", width: 700, padding: "50px 30px" }}>
        <CardTitle />
        <CardContents typeContents="preview" />
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <Space>
            <Button type="primary" style={{ width: 70 }} onClick={onClickSubmit}>
              제출
            </Button>
            <Button onClick={onClickGoBack}>뒤로 가기</Button>
          </Space>
          <Button type="link" onClick={() => setIsModalOn(true)}>
            양식 지우기
          </Button>
        </section>
      </Space>
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
