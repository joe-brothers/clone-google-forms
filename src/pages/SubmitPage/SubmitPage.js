import { CardTitle } from "components/CardTitle";
import { CardContents } from "components/CardContents";
import { Space } from "antd";

export const SubmitPage = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex", width: 700, padding: "50px 30px" }}>
      <CardTitle isSubmit={true} />
      <CardContents typeContents="submit" />
    </Space>
  );
};
