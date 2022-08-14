import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateErrorStatus } from "redux/slices/contentSlice";
import { CardTitle } from "components/CardTitle";
import { CardContents } from "components/CardContents";
import { Space, Button } from "antd";
import "antd/dist/antd.min.css";

export const PreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const onClickGoBack = () => {
    navigate("/");
  };

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

  return (
    <Space direction="vertical" size="large" style={{ display: "flex", width: 700, padding: "50px 30px" }}>
      <CardTitle />
      <CardContents typeContents="preview" />
      <Space>
        <Button type="primary" style={{ width: 70 }} onClick={onClickSubmit}>
          제출
        </Button>
        <Button onClick={onClickGoBack}>뒤로 가기</Button>
      </Space>
    </Space>
  );
};
