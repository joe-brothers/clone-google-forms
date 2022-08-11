import { Button, Checkbox, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  addEtcOfOptionAt,
  addOptionAt,
} from "../../../redux/slices/contentSlice";

export const AddOptionOrEtc = ({ ComponentToCheck, hasEtc, index }) => {
  const dispatch = useDispatch();
  const onClickAddOption = (index) => {
    dispatch(addOptionAt({ index }));
  };
  const onClickAddEtc = (index) => {
    dispatch(addEtcOfOptionAt({ index }));
  };

  return (
    <Space>
      <ComponentToCheck disabled />
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
