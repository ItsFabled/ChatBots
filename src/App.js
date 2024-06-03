// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import rmit_logo from "./rmit_logo.png";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Configure AWS SDK
    window.AWS.config.update({
      region: "ap-southeast-2", // Your AWS region
      credentials: new window.AWS.CognitoIdentityCredentials({
        IdentityPoolId: "ap-southeast-2:d68184d1-e673-4749-9f34-e3352eb8f2ba", // Your Cognito Identity Pool ID
      }),
    });

    const docClient = new window.AWS.DynamoDB.DocumentClient();

    const fetchData = async () => {
      const params = {
        TableName: "chatbot_questions", // Your DynamoDB table name
      };

      try {
        const data = await docClient.scan(params).promise();
        setQuestions(data.Items);
      } catch (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      }
    };

    fetchData();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const docClient = new window.AWS.DynamoDB.DocumentClient();

    try {
      for (let question of questions) {
        const params = {
          TableName: "chatbot_questions", // Your DynamoDB table name
          Item: {
            question: question.question,
            answer: question.answer
          },
        };
        await docClient.put(params).promise();
      }
      alert("Questions submitted successfully!");
    } catch (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      alert(`Error submitting questions: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <link rel="stylesheet" href="https://use.typekit.net/obz3bje.css"></link>
      <header className="App-header">
        <meta name="theme-color" content="#F8F8FF"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="white-translucent"></meta>
      </header>
      <form onSubmit={handleSubmit}>
        <img src={rmit_logo} alt="RMIT University Logo" className="center"></img>
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
            <label htmlFor="text">Question {index + 1}</label>
            <form className="questionheader">
              <input
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(index, event)}
                placeholder="Enter a course question here..."
                className="form-control"
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  className="button removeqbutton"
                  onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to remove this question?");
                    if (confirmed) {
                      removeQuestion(index);
                    }
                  }}
                >
                  🗑️
                </button>
              )}
              {questions.length === 1 && (
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
        <button type="button" onClick={addQuestion} className="button addqbutton">
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
