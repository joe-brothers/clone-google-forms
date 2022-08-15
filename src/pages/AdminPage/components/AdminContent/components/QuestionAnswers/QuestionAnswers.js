import { useSelector } from "react-redux";
import { OptionTextShort, OptionTextLong } from "./OptionText";
import { OptionAddChoiceOrEtc } from "./OptionAddChoiceOrEtc";
import { OptionAddChoice } from "./OptionAddChoice";
import { OptionChoiceUnit } from "./OptionChoiceUnit";
import { OptionChoices } from "./OptionChoices";
import { OptionEtc } from "./OptionEtc";
import { Space, Typography, Radio, Checkbox } from "antd";
const { Text } = Typography;

// 질문 카드 유형에 따라 적절한 답변 옵션 목록을 반환하는 컴포넌트
export const QuestionAnswers = ({ indexQuestion }) => {
  const { questions } = useSelector((state) => state.formContent);
  const { type, optionList, isFocused, hasEtc } = questions[indexQuestion];

  if (type === "textShort") return <OptionTextShort />;
  if (type === "textLong") return <OptionTextLong />;
  if (type === "radio")
    return (
      <Space direction="vertical">
        <OptionChoices
          ComponentToCheck={<Radio disabled />}
          optionList={optionList}
          indexQuestion={indexQuestion}
          isFocused={isFocused}
        />
        {hasEtc && <OptionEtc ComponentToCheck={<Radio disabled />} isFocused={isFocused} index={indexQuestion} />}
        {isFocused && (
          <OptionAddChoiceOrEtc ComponentToCheck={<Radio disabled />} hasEtc={hasEtc} index={indexQuestion} />
        )}
      </Space>
    );
  if (type === "checkbox")
    return (
      <Space direction="vertical">
        <OptionChoices
          ComponentToCheck={<Checkbox disabled />}
          optionList={optionList}
          indexQuestion={indexQuestion}
          isFocused={isFocused}
        />
        {hasEtc && <OptionEtc ComponentToCheck={<Checkbox disabled />} isFocused={isFocused} index={indexQuestion} />}
        {isFocused && (
          <OptionAddChoiceOrEtc ComponentToCheck={<Checkbox disabled />} hasEtc={hasEtc} index={indexQuestion} />
        )}
      </Space>
    );
  if (type === "dropdown")
    return (
      <Space direction="vertical">
        {optionList.map((option, indexOption) => (
          <Space style={{ fontSize: 14 }} key={`q_${indexQuestion}_${indexOption}`}>
            <Text>{indexOption + 1}</Text>
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
        {isFocused && <OptionAddChoice ComponentToCheck={<Text>{optionList.length + 1}</Text>} index={indexQuestion} />}
      </Space>
    );
};
