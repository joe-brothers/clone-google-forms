import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateDescription } from "../redux/slices/formSlice";
import { Space, Input, Card } from "antd";
import "antd/dist/antd.min.css";

export const AdminPage = () => {
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.form);
  const onPreviewClick = () => {
    window.open("/preview", "_blank");
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <button onClick={onPreviewClick}>미리보기</button>
      <Card style={{ width: 700 }}>
        <Input
          value={title}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(updateTitle({ title: e.target.value }));
          }}
        />
        <Input
          onChange={(e) => {
            dispatch(updateDescription({ description: e.target.value }));
          }}
        />
      </Card>
      <p>{title}</p>
      <p>{description}</p>
    </Space>
  );
};
