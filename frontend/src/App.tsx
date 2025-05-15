import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import CreateMenu from "./pages/CreateMenu";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createMenu" element={<CreateMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
