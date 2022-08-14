import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChosenOptions,
  updateErrorStatus,
  updateEtcInput,
  updateOptionCheckbox,
  updateOptionRadio,
  updateOptionText,
} from "redux/slices/contentSlice";
import { checkFormHasRequired } from "utils/functions";
import { Space, Card, Typography, Select, Input, Checkbox, Radio, Button, Divider } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const PreviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const onClickGoBack = () => {
    navigate("/");
  };

  const onClickSubmit = () => {
    let errorNum = 0;
    questions.forEach((question, indexQuestion) => {
      dispatch(updateErrorStatus({ indexQuestion }));
      if (question.isRequired && (question.chosenOptions.length === 0 || question.chosenOptions[0] === "")) {
        errorNum += 1;
      }
    });

    if (errorNum === 0) {
      navigate("/submit");
    }
  };

  const onChangeOptionText = ({ e, indexQuestion }) => {
    dispatch(updateOptionText({ index: indexQuestion, text: e.target.value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onChangeOptionRadio = ({ e, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value: e.target.value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onChangeOptionCheckbox = ({ e, indexQuestion }) => {
    dispatch(
      updateOptionCheckbox({
        index: indexQuestion,
        value: e.target.value,
        checked: e.target.checked,
      })
    );
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onSelectOptionDropdown = ({ value, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onClearChosenOptions = ({ indexQuestion }) => {
    dispatch(clearChosenOptions({ index: indexQuestion }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onChangeEtcInput = ({ e, indexQuestion }) => {
    dispatch(updateEtcInput({ index: indexQuestion, etcInput: e.target.value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex", width: 700, padding: "50px 30px" }}>
      <Card
        style={{
          border: `2px solid #e4e4e4"`,
          borderRadius: 10,
          boxShadow: `rgb(0 0 0 / 5%) 0px 0px 10px 5px`,
        }}
      >
        <Title level={2}>{title}</Title>
        <Text>{description}</Text>
        {checkFormHasRequired(questions) && (
          <Text type="danger" style={{ display: "block", marginTop: 8 }}>
            * 필수항목
          </Text>
        )}
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
                <>
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
                  {!isRequired && chosenOptions.length !== 0 && (
                    <Space style={{ width: "100%", marginTop: 8, justifyContent: "flex-end" }}>
                      <Button type="link" onClick={() => onClearChosenOptions({ indexQuestion })}>
                        선택해제
                      </Button>
                    </Space>
                  )}
                </>
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
                  allowClear={true}
                  onSelect={(value) => onSelectOptionDropdown({ value, indexQuestion })}
                  onClear={() => onClearChosenOptions({ indexQuestion })}
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
                <Space style={{ width: "100%", marginTop: 12 }}>
                  <ExclamationCircleOutlined style={{ fontSize: 20, color: "red" }} />
                  <Text type="danger">필수 질문입니다.</Text>
                </Space>
              )}
            </Card>
          );
        }
      )}

      <Space>
        <Button type="primary" style={{ width: 70 }} onClick={onClickSubmit}>
          제출
        </Button>
        <Button onClick={onClickGoBack}>뒤로 가기</Button>
      </Space>
    </Space>
  );
};
