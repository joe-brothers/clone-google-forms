import { useDispatch } from "react-redux";
import { clearChosenOptions, updateErrorStatus, updateOptionRadio } from "redux/slices/contentSlice";
import { Space, Typography, Dropdown, Button, Menu } from "antd";
import { CheckCircleTwoTone, DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
const { Text } = Typography;

export const OptionsDropdown = ({ typeContents, indexQuestion, optionList, chosenOptions }) => {
  const dispatch = useDispatch();

  const onSelectOptionDropdown = ({ value, indexQuestion }) => {
    dispatch(updateOptionRadio({ index: indexQuestion, value }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };
  const onClearChosenOptions = ({ indexQuestion }) => {
    dispatch(clearChosenOptions({ index: indexQuestion }));
    dispatch(updateErrorStatus({ indexQuestion }));
  };

  const dropdownMenuItems = [
    { label: "선택", key: "선택" },
    { type: "divider" },
    ...optionList.map((option) => ({
      label: option,
      key: option,
    })),
  ];

  const dropdownMenu = ({ indexQuestion }) => {
    return (
      <Menu
        onClick={({ key }) => {
          if (key === "선택") {
            onClearChosenOptions({ indexQuestion });
            return;
          }
          onSelectOptionDropdown({ value: key, indexQuestion });
        }}
        items={dropdownMenuItems}
      />
    );
  };

  return (
    <>
      {typeContents === "preview" && (
        <Dropdown overlay={dropdownMenu({ indexQuestion })} trigger="click">
          <Button style={{ width: 150 }}>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              {chosenOptions[0] || "선택"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      )}
      {typeContents === "submit" && (
        <Space direction="vertical" style={{ width: "100%" }}>
          {optionList.map((option) => (
            <Space>
              <Text>{option}</Text>
              {chosenOptions.includes(option) && <CheckCircleTwoTone />}
            </Space>
          ))}
        </Space>
      )}
    </>
  );
};
