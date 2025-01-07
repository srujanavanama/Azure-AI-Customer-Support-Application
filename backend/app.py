from flask import Flask, request, jsonify
from flask_cors import CORS
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

app = Flask(__name__)
CORS(app)

# Replace with Azure AI endpoint and key
AZURE_ENDPOINT = "<Your-Azure-AI-Endpoint>"
AZURE_KEY = "<Your-Azure-API-Key>"

# Authenticate the Azure Text Analytics Client
try:
    print("Initializing Azure Text Analytics Client...")
    text_analytics_client = TextAnalyticsClient(endpoint=AZURE_ENDPOINT, credential=AzureKeyCredential(AZURE_KEY))
    print("Client initialized successfully.")
except Exception as e:
    print(f"Failed to initialize Azure client: {e}")

@app.route('/analyze-feedback', methods=['POST'])
def analyze_feedback():
    try:
        print("Received request for feedback analysis.")
        feedback = request.json.get('feedback', '')
        print(f"Feedback received: {feedback}")

        if not feedback:
            print("Error: No feedback provided in the request.")
            return jsonify({"error": "Feedback is required."}), 400

        print("Sending feedback to Azure for sentiment analysis...")
        response = text_analytics_client.analyze_sentiment([feedback])
        result = response[0]
        print(f"Analysis result: Sentiment: {result.sentiment}, Confidence Scores: {result.confidence_scores}")

        return jsonify({
            "sentiment": result.sentiment,
            "confidenceScores": {
                "positive": result.confidence_scores.positive,
                "neutral": result.confidence_scores.neutral,
                "negative": result.confidence_scores.negative
            }
        })
    except Exception as e:
        print(f"Error during feedback analysis: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    try:
        print("Starting Flask server...")
        app.run(debug=True, port=5000)
        print("Server is running on http://localhost:5000")
    except Exception as e:
        print(f"Error starting Flask server: {e}")
