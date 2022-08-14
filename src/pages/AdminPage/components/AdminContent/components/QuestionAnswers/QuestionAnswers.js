import { useDispatch, useSelector } from "react-redux";
import { addOptionAt } from "redux/slices/contentSlice";
import { OptionTextShort, OptionTextLong } from "./OptionText";
import { AddOptionOrEtc } from "./AddOptionOrEtc";
import { InputSentence } from "./InputSentence";
import { OptionChoices } from "./OptionChoices";
import { EtcChoice } from "./EtcChoice";
import { Space, Typography, Button, Radio, Checkbox } from "antd";
import "antd/dist/antd.min.css";
const { Text } = Typography;

export const QuestionAnswers = ({ indexQuestion }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const { type, optionList, isFocused, hasEtc } = questions[indexQuestion];

  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };

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
        {hasEtc && <EtcChoice ComponentToCheck={<Radio disabled />} isFocused={isFocused} index={indexQuestion} />}
        {isFocused && <AddOptionOrEtc ComponentToCheck={<Radio disabled />} hasEtc={hasEtc} index={indexQuestion} />}
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
        {hasEtc && <EtcChoice ComponentToCheck={<Checkbox disabled />} isFocused={isFocused} index={indexQuestion} />}
        {isFocused && <AddOptionOrEtc ComponentToCheck={<Checkbox disabled />} hasEtc={hasEtc} index={indexQuestion} />}
      </Space>
    );
  if (type === "dropdown")
    return (
      <Space direction="vertical">
        {optionList.map((option, indexOption) => (
          <Space style={{ fontSize: 14 }} key={`q_${indexQuestion}_${indexOption}`}>
            <Text>{indexOption + 1}</Text>
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
        {isFocused && (
          <Space>
            <Text>{optionList.length + 1}</Text>
            <Button type="dashed" onClick={() => onClickAddOption(indexQuestion)}>
              옵션 추가
            </Button>
          </Space>
        )}
      </Space>
    );
};
