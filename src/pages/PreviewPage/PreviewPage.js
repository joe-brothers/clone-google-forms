import { useSelector } from "react-redux";
import { Space, Card, Typography, Select, Input } from "antd";
import "antd/dist/antd.min.css";
const { Title } = Typography;

export const PreviewPage = () => {
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <h2>Preview Page</h2>
      <Card style={{ width: 700 }}>
        <Title level={2}>{title}</Title>
        <p>{description}</p>
      </Card>
    </Space>
  );
};
