import { useDispatch, useSelector } from "react-redux";
import { updateErrorStatus, updateEtcInput, updateOptionCheckbox } from "redux/slices/contentSlice";
import { Space, Input, Checkbox } from "antd";
import "antd/dist/antd.min.css";

export const OptionsCheckbox = ({ typeContents, indexQuestion }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const { optionList, chosenOptions, hasEtc, etcInput } = questions[indexQuestion];

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
  const onChangeEtcInput = ({ e, indexQuestion }) => {
    dispatch(updateEtcInput({ index: indexQuestion, etcInput: e.target.value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {optionList.map((option, optionIndex) => (
        <Checkbox
          key={`${typeContents}_${indexQuestion}_check${optionIndex}`}
          disabled={typeContents === "submit"}
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
            disabled={typeContents === "submit"}
            value="기타"
            checked={chosenOptions.includes("기타")}
            onChange={(e) => onChangeOptionCheckbox({ e, indexQuestion })}
            style={{ flexShrink: 0, marginRight: 8 }}
          >
            기타:
          </Checkbox>
          <Input
            disabled={typeContents === "submit"}
            value={etcInput}
            onChange={(e) => onChangeEtcInput({ e, indexQuestion })}
            style={{ width: "100%", flexGrow: 1 }}
          />
        </div>
      )}
    </Space>
  );
};
