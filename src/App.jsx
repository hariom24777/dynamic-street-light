import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectOverview from "./pages/ProjectOverview";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overview" element={<ProjectOverview />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
