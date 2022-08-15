import { useDispatch } from "react-redux";
import { addOptionAt } from "redux/slices/contentSlice";
import { Button, Space } from "antd";

// 옵션 추가 컴포넌트 (드롭다운에 사용)
export const OptionAddChoice = ({ ComponentToCheck, index }) => {
  const dispatch = useDispatch();
  // '옵션 추가' 버튼을 눌렀을 때 실행되는 함수
  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };

  return (
    <Space>
      {ComponentToCheck}
      <Button type="dashed" onClick={() => onClickAddOption(index)}>
        옵션 추가
      </Button>
    </Space>
  );
};
