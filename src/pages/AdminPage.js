import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTitle, updateDescription } from "../redux/slices/titleSlice";
import { changeType } from "../redux/slices/contentSlice";
import { Space, Input, Card, Select, Radio } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  const { Option } = Select;
  const onPreviewClick = () => {
    navigate("/preview", { state: { title, description } });
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <button onClick={onPreviewClick}>미리보기</button>
      <Card style={{ width: 700 }}>
        <Input
          size="large"
          placeholder="설문지 제목"
          value={title}
          onChange={(e) => {
            dispatch(updateTitle({ title: e.target.value }));
          }}
        />
        <Input
          placeholder="설문지 설명"
          onChange={(e) => {
            dispatch(updateDescription({ description: e.target.value }));
          }}
        />
      </Card>
      {questions.map(
        ({ title, type, options, isRequired, isFocused }, index) => {
          return (
            <Card style={{ width: 700 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Input size="large" placeholder="질문" value={title} />
                  <Select
                    defaultValue={type}
                    onSelect={(type) => {
                      dispatch(changeType({ type, index }));
                    }}
                    style={{ width: 120 }}
                  >
                    <Option value="textShort">단답형</Option>
                    <Option value="textLong">장문형</Option>
                    <Option value="radio">객관식 질문</Option>
                    <Option value="checkbox">체크박스</Option>
                    <Option value="dropdown">드롭다운</Option>
                  </Select>
                </Space>
                {options}
              </Space>
            </Card>
          );
        }
      )}
      <Card style={{ width: 700 }}>
        <Space direction="vertical">
          <Space>
            <Input
              size="large"
              placeholder="설문지 제목"
              value="제목없는 질문"
            />
            <Select defaultValue="radio" style={{ width: 120 }}>
              <Option value="textShort">단답형</Option>
              <Option value="textLong">장문형</Option>
              <Option value="radio">객관식 질문</Option>
              <Option value="checkbox">체크박스</Option>
              <Option value="dropdown">드롭다운</Option>
            </Select>
          </Space>
          <Radio.Group>
            <Space direction="vertical">
              <Space>
                <Radio value={1}>Option A</Radio>
                <CloseOutlined />
              </Space>
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
            </Space>
          </Radio.Group>
        </Space>
      </Card>
    </Space>
  );
};
