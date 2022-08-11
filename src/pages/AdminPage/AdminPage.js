import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormContent, FormTitle } from "./components";
import { Space } from "antd";
import "antd/dist/antd.min.css";

export const AdminPage = () => {
  const navigate = useNavigate();

  const onClickPreview = () => {
    navigate("/preview");
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <button onClick={onClickPreview}>미리보기</button>
      <FormTitle />
      <FormContent />
    </Space>
  );
};
