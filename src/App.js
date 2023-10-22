import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/home-screen/home";
import QuestionScreen from "./components/question/question";
import ResultScreen from "./components/result/result";

function App() {
  const [quizzes, setQuizzes] = useState([]);

  const [quizSessions, setQuizSessions] = useState([]);

  // const startQuiz = () => {
  //   // Fetch quiz sessions
  //   fetch("http://localhost:5000/quiz_sessions")
  //     .then((response) => response.json())
  //     .then((data) => setQuizSessions(data));
  // };

  // useEffect(() => {
  //   // Fetch quizzes
  //   fetch("http://localhost:5000/quizzes")
  //     .then((response) => response.json())
  //     .then((data) => setQuizzes(data));
  // }, []);
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
