import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  // State to store evaluated results and user input
  const [results, setResults] = useState([]);
  const [inputExpression, setInputExpression] = useState("");

  // Function to evaluate a single expression using the web API
  const evaluateExpression = async (expression) => {
    try {
      const response = await axios.get(
        `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`
      );
      return {
        input: expression,
        output: response.data, // Return the result from the API response
      };
    } catch (error) {
      return {
        input: expression,
        output: `Error: ${error.message}`,
      };
    }
  };

  // Function to handle user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputExpression.trim() !== "") {
      // Create a new array with the updated results
      const newResults = [...results];

      // Evaluate the expression and add it to the newResults array
      const result = await evaluateExpression(inputExpression);
      newResults.push(result);

      // Set the state with the newResults array and clear the input
      setResults(newResults);
      setInputExpression("");

      // Scroll to the bottom to show the latest result
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Expression Evaluator</h1>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter an expression"
            value={inputExpression}
            onChange={(e) => setInputExpression(e.target.value)}
          />
          <button type="submit">Evaluate</button>
        </form>
        <div className="expression-list">
          {results.map((result, index) => (
            <div key={index} className="expression-result">
              <div>
                <strong>Input:</strong> {result.input} {/* Comment for Input */}
              </div>
              <div>
                <strong>Output:</strong> {result.output} {/* Comment for Output */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
