import { useSelector } from "react-redux";

export const PreviewPage = () => {
  const { title, description } = useSelector((state) => state.form);

  return (
    <div>
      <h2>PreviewPage</h2>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};
