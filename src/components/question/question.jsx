import React from "react";
import "./question.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const options = [
  "Data Analysis",
  "User’s feedback",
  "Copy from similar product",
  "Make a questionary",
  "Personal feeling",
];

const QuestionScreen = ({ question, onNextClick }) => {
  return (
    <div className="question-container">
      <div className="background-confetti"></div>
      <div className="question-box">
        <div className="question-text">
          How do you judge what should be added in the next version of the app?
        </div>
        <div className="options-container">
          {options.map((option, index) => (
            <div key={index} className="option-circle d-flex align-items-center">
              <input type="radio" name="option" id="index" />
              <div className="option-text ms-3">{option}</div>
            </div>
          ))}
        </div>
        <div className="q-btn-wrapper d-flex justify-content-center">
          <Link className="q-btn" to="/result">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
