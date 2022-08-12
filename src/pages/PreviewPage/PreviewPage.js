import { useSelector } from "react-redux";
import {
  Space,
  Card,
  Typography,
  Select,
  Input,
  Checkbox,
  Radio,
  Button,
} from "antd";
import "antd/dist/antd.min.css";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const PreviewPage = () => {
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const checkHasRequired = () => {
    let hasRequired = false;
    questions.forEach(({ isRequired }) => {
      if (isRequired) hasRequired = true;
    });
    return hasRequired;
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", width: 700, paddingTop: 50, paddingBottom: 50 }}
    >
      <Card>
        <Title level={2}>{title}</Title>
        <Text>{description}</Text>
        {checkHasRequired() && <Text type="danger">* 필수항목</Text>}
      </Card>
      {questions.map(
        (
          { title, type, optionList, hasEtc, isRequired, isFocused },
          indexQuestion
        ) => {
          return (
            <Card key={`answer_${indexQuestion}`}>
              <Space style={{ width: "100%", marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
                {isRequired && <Text type="danger">*</Text>}
              </Space>
              {type === "textShort" && (
                <Input style={{ width: "50%" }} placeholder="내 답변" />
              )}
              {type === "textLong" && (
                <TextArea autoSize placeholder="내 답변" />
              )}
              {type === "radio" && (
                <Radio.Group style={{ width: "100%" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {optionList.map((option) => (
                      <Radio value={option}>{option}</Radio>
                    ))}
                    {hasEtc && (
                      <div
                        style={{
                          fontSize: 14,
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Radio style={{ flexShrink: 0 }}>기타:</Radio>
                        <Input style={{ width: "100%", flexGrow: 1 }} />
                      </div>
                    )}
                  </Space>
                </Radio.Group>
              )}
              {type === "checkbox" && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {optionList.map((option, optionIndex) => (
                    <Checkbox>{option}</Checkbox>
                  ))}
                  {hasEtc && (
                    <div
                      style={{
                        fontSize: 14,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox style={{ flexShrink: 0, marginRight: 8 }}>
                        기타:
                      </Checkbox>
                      <Input style={{ width: "100%", flexGrow: 1 }} />
                    </div>
                  )}
                </Space>
              )}
              {type === "dropdown" && (
                <Select placeholder="선택" style={{ width: 200 }}>
                  {optionList.map((option) => (
                    <Option value={option}>{option}</Option>
                  ))}
                </Select>
              )}
            </Card>
          );
        }
      )}

      <Button type="primary" style={{ width: 70 }}>
        제출
      </Button>
    </Space>
  );
};
