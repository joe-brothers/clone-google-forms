import { grey } from "@ant-design/colors";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { removeEtcOfOptionAt } from "../../../../redux/slices/contentSlice";
import "antd/dist/antd.min.css";
const { Text } = Typography;

export const EtcSentence = ({ ComponentToCheck, isFocused, index }) => {
  const dispatch = useDispatch();
  const onClickRemoveEtc = (index) => {
    dispatch(removeEtcOfOptionAt({ index }));
  };

  return (
    <Space style={{ fontSize: 14 }}>
      <ComponentToCheck disabled />
      {isFocused ? (
        <Input disabled value="기타..." />
      ) : (
        <Text style={{ color: grey[3] }}>기타...</Text>
      )}
      {isFocused && (
        <CloseOutlined
          style={{
            position: "absolute",
            right: 30,
            color: "#aaa",
            fontSize: 16,
            marginTop: -16
          }}
          onClick={() => onClickRemoveEtc(index)}
        />
      )}
    </Space>
  );
};
