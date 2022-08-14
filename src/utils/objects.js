import { AlignLeftOutlined, CheckCircleOutlined, CheckSquareFilled, DownCircleFilled, EditOutlined } from "@ant-design/icons";

export const questionTypeMenuItems = [
  {
    label: "단답형",
    key: "textShort",
    icon: <EditOutlined />,
  },
  {
    label: "장문형",
    key: "textLong",
    icon: <AlignLeftOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: "객관식 질문",
    key: "radio",
    icon: <CheckCircleOutlined />,
  },
  {
    label: "체크박스",
    key: "checkbox",
    icon: <CheckSquareFilled />,
  },
  {
    label: "드롭다운",
    key: "dropdown",
    icon: <DownCircleFilled />,
  },
];

export const typeMatchObject = {
  textShort: "단답형",
  textLong: "장문형",
  radio: "객관식 질문",
  checkbox: "체크박스",
  dropdown: "드롭다운",
};
