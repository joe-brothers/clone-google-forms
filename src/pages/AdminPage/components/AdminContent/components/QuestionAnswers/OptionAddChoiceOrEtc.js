import { useDispatch } from "react-redux";
import { addOptionAt, setEtcAt } from "redux/slices/contentSlice";
import { Button, Space } from "antd";

// 옵션 및 기타 추가 컴포넌트 (라디오, 체크박스에 사용)
export const OptionAddChoiceOrEtc = ({ ComponentToCheck, hasEtc, index }) => {
  const dispatch = useDispatch();

  // '옵션 추가' 버튼을 눌렀을 때 실행되는 함수
  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };
  // '기타 추가' 버튼을 눌렀을 때 실행되는 함수
  const onClickAddEtc = (index) => {
    dispatch(setEtcAt({ index, hasEtc: true }));
  };

  return (
    <Space>
      {ComponentToCheck}
      <Button type="dashed" onClick={() => onClickAddOption(index)}>
        옵션 추가
      </Button>
      {!hasEtc && (
        <Button
          type="link"
          onClick={() => {
            onClickAddEtc(index);
          }}
        >
          기타 추가
        </Button>
      )}
    </Space>
  );
};
