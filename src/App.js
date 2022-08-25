import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPage, PreviewPage, SubmitPage } from "./pages";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="preview" element={<PreviewPage />} />
        <Route path="submit" element={<SubmitPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
