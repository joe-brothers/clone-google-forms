import { OptionChoiceUnit } from "./OptionChoiceUnit";
import { Space, Typography } from "antd";
const { Text } = Typography;

// 옵션 목록 컴포넌트 (라디오, 체크박스에서 사용)
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
            <OptionChoiceUnit
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
