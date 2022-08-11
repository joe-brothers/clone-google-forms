import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPage, PreviewPage } from "./pages";

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
