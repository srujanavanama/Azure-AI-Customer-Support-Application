 # Azure AI Customer Support Application
This is a customer support application with a form to submit feedback. Front end is developed using ReactJS. The submitted feedback is sent to python-based backend which uses Azure Text Analytics to analyze the feedback. Sentiment of the feedback and confidence scores are displayed after analysing the feedback. Recent feedbacks are also displayed in the UI.

## Features

### Sentiment Analysis
Using Azure Text Analytics to analyze customer feedback submitted via text to categorize sentiment as positive, negative, or neutral.

## Phase 1: Prepare Your Azure Environment
1. Sign in to Azure Portal.
2. Set up a new Resource Group:
    Go to "Resource Groups" → "Create" → Provide a name and region.
3. Create Azure Text Analytics (Cognitive Services) resource under this group: In the Azure portal, Search for Text Analytics → Create.
4. Select the region, pricing tier, and Resource Group.
5. Copy the Endpoint and API Key from the Text Analytics resource after provisioning.

## Phase 2: Setup Development Environment

### Step 2.1 : Frontend setup with React
1. Create React project
```
npx create-react-app frontend
```

2. Navigate to frontend directory
```
cd frontent
```

3. Install dependencies
```
npm install axios
```

4. Run the development server (http://localhost:3000)
```
npm start
```

### Step 2.2 : Backend setup with Python

1. Navigate to backend directory

2. Install the dependencies present in requirements.txt
```
pip install -r requirements.txt
```

3. Replace `<Your-Azure-AI-Endpoint>` and `<Your-Azure-API-Key>` in app.py

4. Run the server (http://localhost:5000)
```
python app.py
```
