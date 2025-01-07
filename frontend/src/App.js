import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import './App.css';

function App() {
  const [feedbackItems, setFeedbackItems] = useState([]);

    const addFeedback = (feedback) => {
        setFeedbackItems([...feedbackItems, feedback]);
    };

    return (
        <div className="App">
            <FeedbackForm onAddFeedback={addFeedback} />
            <FeedbackList feedbackItems={feedbackItems} />
        </div>
    );
}

export default App;
