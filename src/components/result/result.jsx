import React from "react";
import "./result.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResultScreen = ({ correctAnswers, incorrectAnswers, onRestartClick }) => {
  const calculatePercentage = () => {
    const totalQuestions = correctAnswers + incorrectAnswers;
    return totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(0)
      : 0;
  };

  return (
    <div className="result-container">
      <div className="result-box position-relative">
        <div className="result-text">Your Result</div>
        <div className="result-circle w-100 d-flex justify-content-center my-5">
          <CircularProgressbar
            value={60}
            text={`60%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee",
            })}
          />
        </div>
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

        <div className="r-btn-wrapper w-100 position-absolute bottom-0 start-0 mb-4">
          <Link className="r-btn" to="/">
            Start Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
