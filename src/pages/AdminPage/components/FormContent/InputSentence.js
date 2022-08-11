import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {
  changeNthOptionAt,
  removeOptionAt,
} from "../../../../redux/slices/contentSlice";
import "antd/dist/antd.min.css";

export const InputSentence = ({
  optionList,
  option,
  indexOption,
  indexQuestion,
}) => {
  const dispatch = useDispatch();

  const onChangeOption = (e, indexQuestion, indexOption) => {
    dispatch(
      changeNthOptionAt({
        indexQuestion,
        indexOption,
        option: e.target.value,
      })
    );
  };
  const onClickRemoveOption = ({ indexQuestion, indexOption }) => {
    dispatch(removeOptionAt({ indexQuestion, indexOption }));
  };

  return (
    <>
      <Input
        value={option}
        onChange={(e) => onChangeOption(e, indexQuestion, indexOption)}
      />
      {optionList.length > 1 && (
        <CloseOutlined
          style={{ position: "absolute", right: 30 }}
          onClick={() =>
            onClickRemoveOption({
              indexQuestion,
              indexOption,
            })
          }
        />
      )}
    </>
  );
};
