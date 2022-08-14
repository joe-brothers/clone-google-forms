import { useDispatch } from "react-redux";
import {
  clearChosenOptions,
  updateErrorStatus,
  updateEtcInput,
  updateOptionRadio,
} from "redux/slices/contentSlice";
import { Space, Input, Radio, Button } from "antd";
import "antd/dist/antd.min.css";

export const OptionsRadio = ({
  typeContents,
  indexQuestion,
  isRequired,
  optionList,
  chosenOptions,
  hasEtc,
  etcInput,
}) => {
  const dispatch = useDispatch();

  const onChangeOptionRadio = ({ e, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value: e.target.value }));
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
    <>
      <Radio.Group
        value={chosenOptions[0]}
        style={{ width: "100%" }}
        onChange={(e) => onChangeOptionRadio({ e, indexQuestion })}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {optionList.map((option, optionIndex) => (
            <Radio
              disabled={typeContents === "submit"}
              key={`${typeContents}_${indexQuestion}_radio${optionIndex}`}
              value={option}
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
              <Radio disabled={typeContents === "submit"} value="기타" style={{ flexShrink: 0 }}>
                기타:
              </Radio>
              <Input
                disabled={typeContents === "submit"}
                value={etcInput}
                onChange={(e) => onChangeEtcInput({ e, indexQuestion })}
                style={{ width: "100%", flexGrow: 1 }}
              />
            </div>
          )}
        </Space>
      </Radio.Group>
      {typeContents === "preview" && !isRequired && chosenOptions.length !== 0 && (
        <Space style={{ width: "100%", marginTop: 8, justifyContent: "flex-end" }}>
          <Button type="link" onClick={() => onClearChosenOptions({ indexQuestion })}>
            선택해제
          </Button>
        </Space>
      )}
    </>
  );
};
