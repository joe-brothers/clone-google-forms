import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fillDummyQuestions } from "redux/slices/contentSlice";
import { AdminContent, AdminTitle } from "./components";
import { Button, Space } from "antd";
import "antd/dist/antd.min.css";

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPreview = () => {
    navigate("/preview");
  };

  const onClickFillDummyData = () => {
    dispatch(fillDummyQuestions());
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
      <Space>
        <Button type="primary" onClick={onClickPreview}>
          미리보기
        </Button>
        <Button onClick={onClickFillDummyData}>더미 데이터 채우기</Button>
      </Space>
      <AdminTitle />
      <AdminContent />
      <Button type="primary" onClick={onClickPreview}>
        미리보기
      </Button>
    </Space>
  );
};
