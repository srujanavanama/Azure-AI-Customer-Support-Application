import React from "react";

const FeedbackList = ({ feedbackItems }) => {
    return (
        <div className="feedback-list">
            <h2>Recent Feedback</h2>
            <ul>
                {feedbackItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;