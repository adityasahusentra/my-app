import React from "react";
import "./home.css"; // Import the CSS file for styling
import Vector from "../../Vector.svg";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store";

const HomeScreen = () => {
  const newQuizSession = {
    quiz_id: 1,
    current_question_id: 1,
    start_time: Date.now(),
  };

  const { globalState, updateGlobalState } = useGlobalState();

  const navigate = useNavigate();

  const startSession = () => {
    return fetch("http://localhost:5000/quiz_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuizSession),
    });
  };

  const startQuiz = () => {
    startSession()
      .then((res) => res.json())
      .then((data) => {
        //todo save session id
        updateGlobalState(data);
        navigate("/question");
      });
  };

  return (
    <div className="home-container">
      <div className="brand d-flex mt-3 align-items-center">
        <div className="logo">
          <img src={Vector} />
        </div>
        <div className="brand-name ps-2">upraised</div>
      </div>
      <div className="circle-container">
        <div className="circle">
          <span className="quiz-text">Quiz</span>
        </div>
      </div>
      <div className="home-btn-wrapper">
        <button
          onClick={startQuiz}
          className="home-start-button"
          to="/question"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
