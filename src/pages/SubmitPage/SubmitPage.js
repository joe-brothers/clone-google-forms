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

export const SubmitPage = () => {
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", width: 700, paddingTop: 50, paddingBottom: 50 }}
    >
      <Card
        style={{
          border: `2px solid #e4e4e4"`,
          borderRadius: 10,
          boxShadow: `rgb(0 0 0 / 5%) 0px 0px 10px 5px`,
        }}
      >
        <Title level={2}>{title} : 제출 내역</Title>
        <Text>{description}</Text>
      </Card>
      {questions.map(
        (
          {
            title,
            type,
            optionList,
            hasEtc,
            isRequired,
            chosenOptions,
            etcInput,
          },
          indexQuestion
        ) => {
          return (
            <Card
              key={`submit_${indexQuestion}`}
              style={{
                border: `2px solid #e4e4e4"`,
                borderRadius: 10,
                boxShadow: `rgb(0 0 0 / 5%) 0px 0px 10px 5px`,
              }}
            >
              <Space style={{ width: "100%", marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
                {isRequired && <Text type="danger">*</Text>}
              </Space>
              {type === "textShort" && (
                <Input
                  disabled
                  style={{ width: "50%" }}
                  value={chosenOptions[0]}
                />
              )}
              {type === "textLong" && (
                <TextArea disabled autoSize value={chosenOptions[0]} />
              )}
              {type === "radio" && (
                <Radio.Group style={{ width: "100%" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {optionList.map((option) => (
                      <Radio
                        disabled
                        value={option}
                        checked={chosenOptions.includes(option)}
                      >
                        {option}
                      </Radio>
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
                        <Radio
                          disabled
                          checked={chosenOptions.includes("기타")}
                          style={{ flexShrink: 0 }}
                        >
                          기타:
                        </Radio>
                        <Input
                          disabled
                          value={etcInput}
                          style={{ width: "100%", flexGrow: 1 }}
                        />
                      </div>
                    )}
                  </Space>
                </Radio.Group>
              )}
              {type === "checkbox" && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {optionList.map((option, optionIndex) => (
                    <Checkbox disabled checked={chosenOptions.includes(option)}>
                      {option}
                    </Checkbox>
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
                      <Checkbox
                        disabled
                        checked={chosenOptions.includes("기타")}
                        style={{ flexShrink: 0, marginRight: 8 }}
                      >
                        기타:
                      </Checkbox>
                      <Input
                        disabled
                        value={etcInput}
                        style={{ width: "100%", flexGrow: 1 }}
                      />
                    </div>
                  )}
                </Space>
              )}
              {type === "dropdown" && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  {optionList.map((option) => (
                    <Text>
                      {`${option} - ${
                        chosenOptions.includes(option) && `(선택)`
                      }`}
                    </Text>
                  ))}
                </Space>
              )}
            </Card>
          );
        }
      )}
    </Space>
  );
};
