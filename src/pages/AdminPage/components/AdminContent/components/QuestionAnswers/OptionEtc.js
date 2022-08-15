import { useDispatch } from "react-redux";
import { setEtcAt } from "redux/slices/contentSlice";
import { Input, Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { grey } from "@ant-design/colors";
const { Text } = Typography;

// '기타' 옵션 컴포넌트
export const OptionEtc = ({ ComponentToCheck, isFocused, index }) => {
  const dispatch = useDispatch();
  // 기타 옵션의 삭제 버튼을 누르면 실행되는 함수
  const onClickRemoveEtc = (index) => {
    dispatch(setEtcAt({ index, hasEtc: false }));
  };

  return (
    <Space style={{ fontSize: 14 }}>
      {ComponentToCheck}
      {isFocused ? <Input disabled value="기타..." /> : <Text style={{ color: grey[3] }}>기타...</Text>}
      {isFocused && (
        <CloseOutlined
          style={{
            position: "absolute",
            right: 30,
            color: "#aaa",
            fontSize: 16,
            marginTop: -16,
          }}
          onClick={() => onClickRemoveEtc(index)}
        />
      )}
    </Space>
  );
};
