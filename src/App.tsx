import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Rent from "./components/Rent";
import Issues from "./components/Issues";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </Router>
  );
};

export default App;
