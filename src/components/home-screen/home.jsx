import React from "react";
import "./home.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import Vector from "../../Vector.svg";

const HomeScreen = () => {
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
        <Link className="home-start-button" to="/question">Start</Link>
      </div>
    </div>
  );
};

export default HomeScreen;
