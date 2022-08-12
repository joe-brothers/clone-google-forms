import { useDispatch, useSelector } from "react-redux";
import { Space, Card, Typography, Select, Input, Checkbox, Radio, Button } from "antd";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";
import {
  markAsError,
  unmarkAsError,
  updateEtcInput,
  updateOptionCheckbox,
  updateOptionRadio,
  updateOptionText,
} from "../../redux/slices/contentSlice";
import { ExclamationCircleOutlined, ExclamationCircleTwoTone } from "@ant-design/icons";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const PreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const checkIfRequiredAndEmpty = ({ indexQuestion }) => {
    if (!questions[indexQuestion].isRequired) return false;

    console.log(questions[indexQuestion].type);
    console.log(questions[indexQuestion].chosenOptions);
    // 단답형, 장문형 질문일 경우
    if (questions[indexQuestion].type.indexOf("text") !== -1) {
      if (!questions[indexQuestion].chosenOptions[0]) return true;
    }
    // 라디오, 체크박스, 드롭다운 질문일 경우
    else {
      if (questions[indexQuestion].chosenOptions.length === 0) return true;
    }
    return false;
  };

  const checkIfError = ({ indexQuestion }) => {
    if (checkIfRequiredAndEmpty({ indexQuestion })) {
      dispatch(markAsError({ indexQuestion }));
    } else {
      dispatch(unmarkAsError({ indexQuestion }));
    }
  };

  const onClickSubmit = () => {
    let errorNum = 0;
    questions.forEach((question, indexQuestion) => {
      if (checkIfRequiredAndEmpty({ indexQuestion })) {
        dispatch(markAsError({ indexQuestion }));
        errorNum += 1;
      } else {
        dispatch(unmarkAsError({ indexQuestion }));
      }
    });
    if (errorNum === 0) {
      navigate("/submit");
    }
  };

  const onChangeOptionText = ({ e, indexQuestion }) => {
    dispatch(updateOptionText({ index: indexQuestion, text: e.target.value }));
    checkIfError({ indexQuestion });
  };
  const onChangeOptionRadio = ({ e, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value: e.target.value }));
    checkIfError({ indexQuestion });
  };
  const onChangeOptionCheckbox = ({ e, indexQuestion }) => {
    dispatch(
      updateOptionCheckbox({
        index: indexQuestion,
        value: e.target.value,
        checked: e.target.checked,
      })
    );
    checkIfError({ indexQuestion });
  };
  const onChangeOptionDropdown = ({ value, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value }));
    checkIfError({ indexQuestion });
  };
  const onChangeEtcInput = ({ e, indexQuestion }) => {
    dispatch(updateEtcInput({ index: indexQuestion, etcInput: e.target.value }));
  };

  const checkFormHasRequired = () => {
    let hasRequired = false;
    questions.forEach(({ isRequired }) => {
      if (isRequired) hasRequired = true;
    });
    return hasRequired;
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex", width: 700, paddingTop: 50, paddingBottom: 50 }}>
      <Card
        style={{
          border: `2px solid #e4e4e4"`,
          borderRadius: 10,
          boxShadow: `rgb(0 0 0 / 5%) 0px 0px 10px 5px`,
        }}
      >
        <Title level={2}>{title}</Title>
        <Text>{description}</Text>
        {checkFormHasRequired() && <Text type="danger">* 필수항목</Text>}
      </Card>
      {questions.map(
        ({ title, type, optionList, hasEtc, isRequired, isError, chosenOptions, etcInput }, indexQuestion) => {
          return (
            <Card
              key={`answer_${indexQuestion}`}
              style={{
                border: `2px solid ${isError ? "red" : "#e4e4e4"}`,
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
                  value={chosenOptions[0]}
                  style={{ width: "100%" }}
                  onChange={(e) => onChangeOptionRadio({ e, indexQuestion })}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {optionList.map((option, optionIndex) => (
                      <Radio key={`q${indexQuestion}_radio${optionIndex}`} value={option}>
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
                        <Radio value="기타" style={{ flexShrink: 0 }}>
                          기타:
                        </Radio>
                        <Input
                          value={etcInput}
                          onChange={(e) => onChangeEtcInput({ e, indexQuestion })}
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
                      onChange={(e) => onChangeOptionCheckbox({ e, indexQuestion })}
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
                        onChange={(e) => onChangeOptionCheckbox({ e, indexQuestion })}
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
                <Select
                  onChange={(value) => onChangeOptionDropdown({ value, indexQuestion })}
                  value={chosenOptions[0]}
                  placeholder="선택"
                  style={{ width: 200 }}
                >
                  {optionList.map((option, optionIndex) => (
                    <Option key={`q${indexQuestion}_drop${optionIndex}`} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              )}
              {isError && (
                <Space style={{ marginTop: 12 }}>
                  <ExclamationCircleOutlined style={{ fontSize: 20, color: "red" }} />
                  <Text type="danger">필수 질문입니다.</Text>
                </Space>
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
