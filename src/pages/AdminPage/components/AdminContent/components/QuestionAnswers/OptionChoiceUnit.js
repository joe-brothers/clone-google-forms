import { useDispatch } from "react-redux";
import { changeNthOptionAt, removeOptionAt } from "redux/slices/contentSlice";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";

// 답변 옵션 하나를 리턴하는 컴포넌트 (라디오, 체크박스 옵션으로 사용)
// ex) 라디오버튼+옵션1, 체크박스+옵션2
export const OptionChoiceUnit = ({ optionList, option, indexOption, indexQuestion }) => {
  const dispatch = useDispatch();

  // 옵션 내용을 변경할 때 실행되는 함수
  const onChangeOption = (e, indexQuestion, indexOption) => {
    dispatch(
      changeNthOptionAt({
        indexQuestion,
        indexOption,
        option: e.target.value,
      })
    );
  };
  // 옵션 삭제 버튼을 누르면 실행되는 함수
  const onClickRemoveOption = ({ indexQuestion, indexOption }) => {
    dispatch(removeOptionAt({ indexQuestion, indexOption }));
  };

  return (
    <>
      <Input value={option} onChange={(e) => onChangeOption(e, indexQuestion, indexOption)} />
      {optionList.length > 1 && (
        <CloseOutlined
          style={{
            position: "absolute",
            right: 30,
            color: "#aaa",
            fontSize: 16,
          }}
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
