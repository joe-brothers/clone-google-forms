import { Space, Typography } from "antd";
import { InputSentence } from "./InputSentence";
const { Text } = Typography;

export const OptionChoices = ({
  ComponentToCheck,
  optionList,
  indexQuestion,
  isFocused,
}) => {
  return (
    <>
      {optionList.map((option, indexOption) => (
        <Space
          key={`option_${indexQuestion}_${indexOption}`}
          style={{ fontSize: 14, width: "100%", marginTop: 8 }}
        >
          {ComponentToCheck}
          {isFocused ? (
            <InputSentence
              optionList={optionList}
              option={option}
              indexOption={indexOption}
              indexQuestion={indexQuestion}
            />
          ) : (
            <Text>{option}</Text>
          )}
        </Space>
      ))}
    </>
  );
};
