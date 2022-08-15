import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fillDummyQuestions } from "redux/slices/contentSlice";
import { AdminContent, AdminTitle } from "./components";
import { Button, Space } from "antd";

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // '미리보기' 버튼을 눌렀을 때 실행되는 함수
  const onClickPreview = () => {
    navigate("/preview");
  };

  // '더미 데이터 채우기' 버튼을 눌렀을 때 실행되는 함수
  const onClickFillDummyData = () => {
    dispatch(fillDummyQuestions());
  };

  return (
    <section
      id="form-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        paddingTop: 50,
        paddingBottom: 50,
        position: "relative",
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
    </section>
  );
};
