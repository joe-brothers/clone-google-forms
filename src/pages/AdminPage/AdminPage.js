import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContent, FormTitle } from "./components";
import { Space } from "antd";
import "antd/dist/antd.min.css";

export const AdminPage = () => {
  const navigate = useNavigate();
  const { title, description } = useSelector((state) => state.formTitle);

  const onClickPreview = () => {
    navigate("/preview", { state: { title, description } });
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", position: "relative" }}
    >
      <button onClick={onClickPreview}>미리보기</button>
      <FormTitle />
      <FormContent />
    </Space>
  );
};
