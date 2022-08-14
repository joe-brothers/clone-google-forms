import { useDispatch } from "react-redux";
import { clearChosenOptions, updateErrorStatus, updateOptionRadio } from "redux/slices/contentSlice";
import { Space, Typography, Select } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { Text } = Typography;
const { Option } = Select;

export const OptionsDropdown = ({ typeContents, indexQuestion, optionList, chosenOptions }) => {
  const dispatch = useDispatch();

  const onSelectOptionDropdown = ({ value, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onClearChosenOptions = ({ indexQuestion }) => {
    dispatch(clearChosenOptions({ index: indexQuestion }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };

  return (
    <>
      {typeContents === "preview" && (
        <Select
          allowClear={true}
          onSelect={(value) => onSelectOptionDropdown({ value, indexQuestion })}
          onClear={() => onClearChosenOptions({ indexQuestion })}
          value={chosenOptions[0]}
          placeholder="선택"
          style={{ width: 200 }}
        >
          {optionList.map((option, optionIndex) => (
            <Option key={`${typeContents}_${indexQuestion}_drop${optionIndex}`} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      )}
      {typeContents === "submit" && (
        <Space direction="vertical" style={{ width: "100%" }}>
          {optionList.map((option) => (
            <Space>
              <Text>{option}</Text>
              {chosenOptions.includes(option) && <CheckCircleTwoTone />}
            </Space>
          ))}
        </Space>
      )}
    </>
  );
};
