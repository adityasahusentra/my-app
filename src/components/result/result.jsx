import React from 'react';
import './result.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";

const ResultScreen = ({ correctAnswers, incorrectAnswers, onRestartClick }) => {
  const calculatePercentage = () => {
    const totalQuestions = correctAnswers + incorrectAnswers;
    return totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(0) : 0;
  };

  return (
    <div className="result-container">
      <div className="background-confetti"></div>
      <div className="gauge-container">
        <div className="gauge">
          <div className="needle" style={{ transform: `rotate(${calculatePercentage()}deg)` }}></div>
        </div>
      </div>
      <div className="result-text">
        <div>{correctAnswers} Correct</div>
        <div>{incorrectAnswers} Incorrect</div>
      </div>
      <button className="restart-button" onClick={onRestartClick}>
      <Link to="/">Start Again</Link>
      </button>
    </div>
  );
};

export default ResultScreen;
