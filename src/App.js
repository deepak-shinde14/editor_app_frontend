import React from "react";
import { Routes, Route } from "react-router-dom";  // Use Routes and Route
import LoginPage from "./Components/Loginpage/LoginPage";  // Your login page component
import WordProcessor from "./Components/editor/WordProcessor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/editor" element={<WordProcessor />} />
    </Routes>
  );
};

export default App;
