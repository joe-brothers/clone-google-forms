import { Input } from "antd";

const { TextArea } = Input;

// 답변 옵션 하나를 리턴하는 컴포넌트들 (단답형, 장문형 옵션으로 사용)

export const OptionTextShort = () => {
  return <Input disabled style={{ width: "50%" }} placeholder="단답형 텍스트" />;
};

export const OptionTextLong = () => {
  return <TextArea disabled autoSize placeholder="장문형 텍스트" />;
};
