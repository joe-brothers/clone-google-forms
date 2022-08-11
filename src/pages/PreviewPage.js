import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Space, Input, Card, Select } from "antd";
import "antd/dist/antd.min.css";

export const PreviewPage = () => {
  const { state } = useLocation();
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <h2>Preview Page</h2>
      <Card style={{ width: 700 }}>
        <p>{title}</p>
        <p>{description}</p>
      </Card>
    </Space>
  );
};
