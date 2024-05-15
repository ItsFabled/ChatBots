import React, { useState } from "react";
import "./App.css";
import rmit_logo from "./rmit_logo.png";

// Main App component
function App() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answer: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      {/* rmit font link */}
      <link rel="stylesheet" href="https://use.typekit.net/obz3bje.css"></link>
      <header className="App-header">
        {/* tags for styling on safari */}
        <meta name="theme-color" content="#F8F8FF"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="white-translucent"
        ></meta>

        {/* University Logo and Form Title should go here */}
      </header>
      <form onSubmit={handleSubmit}>
        <img src={rmit_logo} alt="RMIT University Logo" class="center"></img>
        <h1>Chatbot Q&A Form</h1>
        <div className="form-group">
          <label htmlFor="course-select">Select Course</label>
          <select id="course-select" className="form-control">
            <option value="programming">Programming Project 1 (2410)</option>
            <option value="cloud">Cloud Security (2410)</option>
          </select>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="question-answer-group">
            <label for="text">Question {index + 1}</label>
            <form className="questionheader">
              <input
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(index, event)}
                placeholder="Enter a course question here..."
                className="form-control"
              />
              {questions.length > 1 && ( // remove button enabled
                <button
                  type="button"
                  className="button removeqbutton"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to remove this question?"
                    );
                    if (confirmed) {
                      removeQuestion(index);
                    }
                  }}
                >
                  🗑️
                </button>
              )}
              {questions.length === 1 && ( // remove button disabled
                <button type="button" className="button removeqbuttondisabled">
                  🗑️
                </button>
              )}
            </form>
            <textarea
              value={question.answer}
              onChange={(event) => handleAnswerChange(index, event)}
              placeholder="Provide an answer for the question above..."
              className="form-control"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="button addqbutton"
        >
          Add Question
        </button>
        <button type="submit" className="button submitbutton">
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default App;
