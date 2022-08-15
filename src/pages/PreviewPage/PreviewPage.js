import { CardTitle } from "components/CardTitle";
import { CardContents } from "components/CardContents";
import { PreviewButtons } from "./PreviewButtons";
import { PreviewFooter } from "./PreviewFooter";
import { Space } from "antd";

export const PreviewPage = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex", width: 700, padding: "50px 30px" }}>
      <CardTitle />
      <CardContents typeContents="preview" />
      <PreviewButtons />
      <PreviewFooter />
    </Space>
  );
};
