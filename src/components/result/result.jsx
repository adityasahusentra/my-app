import React, { useEffect, useState } from "react";
import "./result.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGlobalState } from "../../store";

const ResultScreen = () => {
  const [state, setState] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    score: 0,
    loading: true,
  });

  const { globalState, updateGlobalState } = useGlobalState();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch data from multiple APIs using Promise.all
        const [quizSessions, userResponses] = await Promise.all([
          fetch("http://localhost:5000/quiz_sessions"),
          fetch("http://localhost:5000/user_responses"),
        ]);

        if (isMounted) {
          const quizSessionsData = await quizSessions.json();
          const userResponseData = await userResponses.json();

          const latestSession = quizSessionsData.find(
            (el) => el.id === globalState.id
          );
          const totalQuestions = userResponseData.filter(
            (el) => el.session_id === latestSession.id
          );
          const correctAnswers = totalQuestions.filter(
            (el) => el.is_answer_correct
          );

          setState((prevState) => ({
            ...prevState,
            totalQuestions: totalQuestions.length,
            correctAnswers: correctAnswers.length,
            score: Math.floor(
              (correctAnswers.length / totalQuestions.length) * 100
            ),
            loading: false,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    //cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  return !state.loading ? (
    <div className="result-container">
      <div className="result-box position-relative">
        <div className="result-text">Your Result</div>
        <div className="result-circle w-100 d-flex justify-content-center my-5">
          <CircularProgressbar
            value={state.score}
            text={`${state.score}%`}
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
            <div className="correct-count">{state.correctAnswers}</div>
            <div className="correct-text">Correct</div>
          </div>
          <div className="incorrect-item d-flex align-items-center px-3 py-4 mt-3">
            <div className="red-dot"></div>
            <div className="incorrect-count">
              {state.totalQuestions - state.correctAnswers}
            </div>
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
  ) : (
    <div>loading...</div>
  );
};

export default ResultScreen;
