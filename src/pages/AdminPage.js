import { useDispatch, useSelector } from "react-redux";
import { updateTitle } from "../redux/slices/formSlice";

export const AdminPage = () => {
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.form);
  const onPreviewClick = () => {
    window.open("/preview", "_blank");
  };

  return (
    <div>
      <button onClick={onPreviewClick}>미리보기</button>
      <input
        value={title}
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(updateTitle({ title: e.target.value }));
        }}
      />
      <p>{title}</p>
      <input
        onChange={(e) => {
          dispatch(updateTitle({ description: e.target.value }));
        }}
      />
    </div>
  );
};
