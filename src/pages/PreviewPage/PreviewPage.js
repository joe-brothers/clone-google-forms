import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import {
  updateEtcInput,
  updateOptionCheckbox,
  updateOptionRadio,
  updateOptionText,
} from "../../redux/slices/contentSlice";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const PreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const onClickSubmit = () => {
    navigate("/submit");
  };

  const onChangeOptionText = ({ e, indexQuestion }) => {
    dispatch(updateOptionText({ index: indexQuestion, text: e.target.value }));
  };
  const onChangeOptionRadio = ({ e, indexQuestion }) => {
    console.log(questions[indexQuestion].chosenOptions);
    dispatch(
      updateOptionRadio({ index: indexQuestion, value: e.target.value })
    );
  };
  const onChangeOptionCheckbox = ({ e, indexQuestion }) => {
    dispatch(
      updateOptionCheckbox({
        index: indexQuestion,
        value: e.target.value,
        checked: e.target.checked,
      })
    );
  };
  const onChangeEtcInput = ({ e, indexQuestion }) => {
    dispatch(
      updateEtcInput({ index: indexQuestion, etcInput: e.target.value })
    );
  };

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
          {
            title,
            type,
            optionList,
            hasEtc,
            isRequired,
            chosenOptions,
            isEtcChosen,
            etcInput,
          },
          indexQuestion
        ) => {
          return (
            <Card key={`answer_${indexQuestion}`}>
              <Space style={{ width: "100%", marginBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
                {isRequired && <Text type="danger">*</Text>}
              </Space>
              {type === "textShort" && (
                <Input
                  style={{ width: "50%" }}
                  placeholder="내 답변"
                  onChange={(e) => {
                    onChangeOptionText({ e, indexQuestion });
                  }}
                />
              )}
              {type === "textLong" && (
                <TextArea
                  autoSize
                  placeholder="내 답변"
                  onChange={(e) => {
                    onChangeOptionText({ e, indexQuestion });
                  }}
                />
              )}
              {type === "radio" && (
                <Radio.Group
                  style={{ width: "100%" }}
                  onChange={(e) => onChangeOptionRadio({ e, indexQuestion })}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {optionList.map((option, optionIndex) => (
                      <Radio
                        key={`q${indexQuestion}_radio${optionIndex}`}
                        value={option}
                        checked={chosenOptions.includes(option)}
                      >
                        {/* {option} */}
                        {`${option} - ${chosenOptions.includes(option)}`}
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
                          value="기타"
                          checked={chosenOptions.includes("기타")}
                          style={{ flexShrink: 0 }}
                        >
                          {/* 기타: */}
                          {`기타 - ${chosenOptions.includes("기타")}`}
                        </Radio>
                        <Input
                          value={etcInput}
                          onChange={(e) =>
                            onChangeEtcInput({ e, indexQuestion })
                          }
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
                    <Checkbox
                      key={`q${indexQuestion}_check${optionIndex}`}
                      value={option}
                      checked={chosenOptions.includes(option)}
                      onChange={(e) =>
                        onChangeOptionCheckbox({ e, indexQuestion })
                      }
                    >
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
                        value="기타"
                        checked={chosenOptions.includes("기타")}
                        onChange={(e) =>
                          onChangeOptionCheckbox({ e, indexQuestion })
                        }
                        style={{ flexShrink: 0, marginRight: 8 }}
                      >
                        기타:
                      </Checkbox>
                      <Input
                        value={etcInput}
                        onChange={(e) => onChangeEtcInput({ e, indexQuestion })}
                        style={{ width: "100%", flexGrow: 1 }}
                      />
                    </div>
                  )}
                </Space>
              )}
              {type === "dropdown" && (
                <Select placeholder="선택" style={{ width: 200 }}>
                  {optionList.map((option, optionIndex) => (
                    <Option
                      key={`q${indexQuestion}_drop${optionIndex}`}
                      value={option}
                    >
                      {option}
                    </Option>
                  ))}
                </Select>
              )}
            </Card>
          );
        }
      )}

      <Button type="primary" style={{ width: 70 }} onClick={onClickSubmit}>
        제출
      </Button>
    </Space>
  );
};
