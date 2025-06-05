import React from "react";
import "./App.css";
import ImageGenerator from "./components/ImageGenerator/ImageGenerator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/Landingpage/FrontPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/ImageGenrator" element={<ImageGenerator />} />
        </Routes>
      </Router>
  );
}

export default App;
