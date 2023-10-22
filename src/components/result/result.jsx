import React from "react";
import "./result.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const ResultScreen = ({ correctAnswers, incorrectAnswers, onRestartClick }) => {
  const calculatePercentage = () => {
    const totalQuestions = correctAnswers + incorrectAnswers;
    return totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(0)
      : 0;
  };

  return (
    <div className="result-container">
      <div className="result-box">
        <div className="result-text">Your Result</div>
        <div className="result-meter"></div>
        <div className="correct-incorrect">
          <div className="correct-item d-flex align-items-center px-3 py-4">
            <div className="green-dot"></div>
            <div className="correct-count">3</div>
            <div className="correct-text">Correct</div>
          </div>
          <div className="incorrect-item d-flex align-items-center px-3 py-4 mt-3">
            <div className="red-dot"></div>
            <div className="incorrect-count">2</div>
            <div className="incorrect-text">Incorrect</div>
          </div>
        </div>

        <div className="r-btn-wrapper d-flex justify-content-center">
          <Link className="restart-btn" to="/">
            Start Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
