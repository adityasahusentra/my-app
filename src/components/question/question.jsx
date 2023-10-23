import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./question.css"; // Import the CSS file for styling

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuestionScreen = () => {
  const [state, setState] = useState({
    questions: [],
    options: [],
    currentQuestionIndex: 0,
    currentOptions: [],
    isFetching: true,
    startTime: 0,
  });

  let [nextDisabled, setDisabled] = useState(true);

  const getDurationInSec = () => {
    return (Date.now() - state.startTime) / 1000;
  };

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
            startTime: Date.now(),
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
      return currentOptionsData.map((el) => ({ ...el, selected: false }));
    }

    return [];
  };

  const submitAnswer = () => {
    const selectedOptions = state.currentOptions
      .filter((el) => el.selected)
      ?.map((el) => el.text);
    const userResponsePayload = {
      session_id: 1,
      question_id: state.questions[state.currentQuestionIndex].id,
      selected_options: selectedOptions,
      response_time: getDurationInSec(),
      created_at: Date.now(),
    };

    return fetch("http://localhost:5000/user_responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userResponsePayload),
    });
  };

  const nextQuestion = () => {
    submitAnswer().then(() => {
      if (state.currentQuestionIndex + 1 < state.questions.length) {
        setState((prevState) => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          currentOptions: filterCurrentOptions(
            prevState.questions,
            prevState.currentQuestionIndex + 1,
            prevState.options
          ),
          startTime: Date.now(),
        }));

        //removed checked class
        for (let el of document.getElementsByClassName("option-circle")) {
          el.classList.remove("checked-option");
        }

        //disabled next button by default
        setDisabled(true);
      } else {
        navigate("/result");
      }
    });
  };

  const onSelectOption = (event, option) => {
    const modifiedCurrentOptions = [...state.currentOptions];
    const optionToChange = modifiedCurrentOptions.find(
      (el) => el.id === option.id
    );
    optionToChange.selected = !optionToChange.selected;
    event.target.classList.toggle("checked-option");
    setDisabled(!(state.currentOptions.filter(el => el.selected)?.length));
  
    setState((prevState) => ({
      ...prevState,
      currentOptions: modifiedCurrentOptions,
    }));
  };

  return !state.isFetching ? (
    <div className="question-container">
      <div className="background-confetti"></div>
      <div className="question-box position-relative">
        <div className="progress-circle w-100 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
          <CircularProgressbar
            value={`${
              ((state.currentQuestionIndex + 1) / state.questions.length) * 100
            }`}
            text={`${state.currentQuestionIndex + 1}/${state.questions.length}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#fff",
              textColor: "#000",
              pathColor: "#44B77B",
              trailColor: "#F3F4FA",
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
              onClick={($event) => onSelectOption($event, option)}
              className="option-circle d-flex align-items-center"
            >
              <input
                type="checkbox"
                name="option"
                id="index"
                checked={option.selected}
              />
              <div className="option-text ms-3">{option.text}</div>
            </div>
          ))}
        </div>
        <div className="q-btn-wrapper w-100 position-absolute bottom-0 start-0 mb-4">
          <button
            onClick={nextQuestion}
            className="q-btn position-relative"
            disabled={nextDisabled}
          >
            Next <span className="position-absolute end-0 me-4">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
};

export default QuestionScreen;
