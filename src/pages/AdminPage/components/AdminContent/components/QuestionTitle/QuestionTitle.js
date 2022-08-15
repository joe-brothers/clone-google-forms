import { useDispatch, useSelector } from "react-redux";
import { changeQuestionType, changeTitleAt } from "redux/slices/contentSlice";
import { questionTypeMenuItems, typeMatchObject } from "utils/objects";
import { Space, Typography, Input, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Text } = Typography;

export const QuestionTitle = ({ indexQuestion }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.formContent);
  const { title, type, isFocused, isRequired } = questions[indexQuestion];

  // 질문카드의 제목을 바꿀 때 실행되는 함수
  const onChangeTitle = (e, index) => {
    dispatch(changeTitleAt({ index, title: e.target.value }));
  };

  // 질문카드 유형(단답형/장문형/..)을 보여줄 드롭다운 메뉴를 리턴하는 함수
  const questionTypeMenu = ({ indexQuestion }) => {
    return (
      <Menu
        onClick={({ key }) => {
          dispatch(changeQuestionType({ type: key, index: indexQuestion }));
        }}
        items={questionTypeMenuItems}
      />
    );
  };

  return (
    <article style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
      {isFocused ? (
        <>
          <Input
            id="form-input"
            size="large"
            placeholder="질문"
            value={title}
            onChange={(e) => onChangeTitle(e, indexQuestion)}
          />
          <Dropdown overlay={questionTypeMenu({ indexQuestion })} trigger="click">
            <Button style={{ width: 150 }}>
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                {typeMatchObject[type]}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      ) : (
        <Space style={{ fontSize: 16 }}>
          {title || "질문"}
          {isRequired && <Text type="danger">*</Text>}
        </Space>
      )}
    </article>
  );
};
