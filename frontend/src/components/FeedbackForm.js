import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onAddFeedback }) => {
    const [feedback, setFeedback] = useState("");
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSentiment(null);

        try {
            const response = await axios.post("http://localhost:5000/analyze-feedback", {
                feedback,
            });
            setSentiment(response.data);
            onAddFeedback(feedback);
        } catch (err) {
            console.error(err.response || err.message);
            setError("Failed to analyze sentiment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="feedback-form">
                <h1>Feedback Form</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        rows="5"
                        cols="50"
                        placeholder="Enter your feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit" disabled={loading || !feedback}>
                        {loading ? "Analyzing..." : "Submit"}
                    </button>
                </form>
            </div>
            <div className="result">
                {sentiment && (
                    <div className="success">
                        <h2>Analysis Result:</h2>
                        <p>Sentiment: {sentiment.sentiment}</p>
                        <p>Confidence Scores:</p>
                        <ul>
                            <li>Positive: {sentiment.confidenceScores.positive}</li>
                            <li>Neutral: {sentiment.confidenceScores.neutral}</li>
                            <li>Negative: {sentiment.confidenceScores.negative}</li>
                        </ul>
                    </div>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default FeedbackForm;