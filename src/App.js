import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { PreviewPage } from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
