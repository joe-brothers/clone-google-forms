import { useSelector } from "react-redux";
import { checkFormHasRequired } from "utils/functions";
import { Card, Typography } from "antd";
import "antd/dist/antd.min.css";
const { Text, Title } = Typography;

export const CardTitle = ({ isSubmit }) => {
  const { title, description } = useSelector((state) => state.formTitle);
  const { questions } = useSelector((state) => state.formContent);

  return (
    <Card
      style={{
        border: `2px solid #e4e4e4"`,
        borderRadius: 10,
        boxShadow: `rgb(0 0 0 / 5%) 0px 0px 10px 5px`,
      }}
    >
      <Title level={2}>{isSubmit && '[제출완료] '}{title}</Title>
      <Text>{description}</Text>
      {checkFormHasRequired(questions) && (
        <Text type="danger" style={{ display: "block", marginTop: 8 }}>
          * 필수항목
        </Text>
      )}
    </Card>
  );
};
