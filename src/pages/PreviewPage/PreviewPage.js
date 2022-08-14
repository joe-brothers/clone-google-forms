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
        <article
          style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#70757a", fontSize: 12 }}
        >
          <p style={{ alignSelf: "flex-start" }}>
            Ahra Forms를 통해 비밀번호를 제출해도 됩니다. 서버와 연결되지 않았기 때문입니다.
          </p>
          <p>이 콘텐츠는 Ahra가 만들고 승인했습니다.</p>
          <a
            href="https://choar816.github.io/intro-choar/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#70757a", fontSize: 20 }}
          >
            Ahra 설문지
          </a>
        </article>
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
