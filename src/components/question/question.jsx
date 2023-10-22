import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./question.css"; // Import the CSS file for styling

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuestionScreen = () => {
  const [state, setState] = useState({
    questions: [],
    options: [],
    currentQuestionIndex: 0,
    currentOptions: [],
    isFetching: true,
  });

  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch data from multiple APIs using Promise.all
        const [questionResponse, optionResponse] = await Promise.all([
          fetch("http://localhost:5000/questions"),
          fetch("http://localhost:5000/options"),
        ]);

        if (isMounted) {
          // Parse JSON data from responses
          const questionData = await questionResponse.json();
          const optionData = await optionResponse.json();

          // Set state with fetched data
          setState((prevState) => ({
            ...prevState,
            questions: questionData,
            options: optionData,
            isFetching: false,
            currentQuestionIndex: 0,
            currentOptions: filterCurrentOptions(questionData, 0, optionData),
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

  const filterCurrentOptions = (questions, currentQuestionIndex, options) => {
    if (questions[currentQuestionIndex] && questions[currentQuestionIndex].id) {
      const currentOptionsData = options.filter(
        (el) => el["question_id"] === questions[currentQuestionIndex].id
      );
      return currentOptionsData;
    }

    return [];
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex + 1 < state.questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        currentOptions: filterCurrentOptions(
          prevState.questions,
          prevState.currentQuestionIndex + 1,
          prevState.options
        ),
      }));
    } else {
      navigate("/result");
    }
  };

  return !state.isFetching ? (
    <div className="question-container">
      <div className="question-box position-relative">
        <div className="progress-circle w-100 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
        <CircularProgressbar
        value={20}
        text={"1/3"}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#fff",
          textColor: "#000",
          pathColor: "#44B77B",
          trailColor: "#F3F4FA"
        })}
      />
        </div>
        <div className="question-text">
          {state.questions[state.currentQuestionIndex]?.text}
        </div>

        {state.questions[state.currentQuestionIndex].image_url ? (
          <div className="image-container my-4">
            <img src={state.questions[state.currentQuestionIndex]?.image_url} />
          </div>
        ) : (
          ""
        )}
        <div className="options-container">
          {state.currentOptions.map((option, index) => (
            <div
              key={index}
              className="option-circle d-flex align-items-center"
            >
              <input type="checkbox" name="option" id="index" />
              <div className="option-text ms-3">{option.text}</div>
            </div>
          ))}
        </div>
        <div className="q-btn-wrapper w-100 position-absolute bottom-0 start-0 mb-4">
          <button onClick={nextQuestion} className="q-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
};

export default QuestionScreen;
