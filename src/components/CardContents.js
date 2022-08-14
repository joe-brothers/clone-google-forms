import { useDispatch, useSelector } from "react-redux";
import { updateErrorStatus, updateOptionText } from "redux/slices/contentSlice";
import { Space, Card, Typography, Select, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { OptionsRadio } from "./OptionsRadio";
import { OptionsCheckbox } from "./OptionsCheckbox";
import { OptionsDropdown } from "./OptionsDropdown";
const { Text } = Typography;
const { TextArea } = Input;

export const CardContents = ({ typeContents }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);

  const onChangeOptionText = ({ e, indexQuestion }) => {
    dispatch(updateOptionText({ index: indexQuestion, text: e.target.value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {questions.map(
        ({ title, type, optionList, hasEtc, isRequired, isError, chosenOptions, etcInput }, indexQuestion) => {
          return (
            <Card
              key={`card_${typeContents}_${indexQuestion}`}
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
                  disabled={typeContents === "submit"}
                  value={chosenOptions[0]}
                  placeholder={typeContents === "preview" ? `내 답변` : ''}
                  onChange={(e) => {
                    onChangeOptionText({ e, indexQuestion });
                  }}
                  style={{ width: "50%" }}
                />
              )}
              {type === "textLong" && (
                <TextArea
                  disabled={typeContents === "submit"}
                  value={chosenOptions[0]}
                  placeholder={typeContents === "preview" ? `내 답변` : ''}
                  onChange={(e) => {
                    onChangeOptionText({ e, indexQuestion });
                  }}
                  autoSize
                />
              )}
              {type === "radio" && <OptionsRadio typeContents={typeContents} indexQuestion={indexQuestion} />}
              {type === "checkbox" && <OptionsCheckbox typeContents={typeContents} indexQuestion={indexQuestion} />}
              {type === "dropdown" && <OptionsDropdown typeContents={typeContents} indexQuestion={indexQuestion} />}
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
    </section>
  );
};
