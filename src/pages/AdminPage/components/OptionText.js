import { Input } from "antd";
import "antd/dist/antd.min.css";
const { TextArea } = Input;

export const OptionTextShort = () => {
  return (
    <Input disabled style={{ width: "50%" }} placeholder="단답형 텍스트" />
  );
};

export const OptionTextLong = () => {
  return <TextArea disabled autoSize placeholder="장문형 텍스트" />;
};
