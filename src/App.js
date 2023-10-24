import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/home-screen/home";
import QuestionScreen from "./components/question/question";
import ResultScreen from "./components/result/result";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/question" element={<QuestionScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
