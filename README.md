# AI Excel Business Automation

An n8n workflow that reads sales data from Google Sheets and uses Google Gemini to analyze it and answer business questions.

## What it does
- Starts from a chat message
- Reads sales records from Google Sheets (date, product, category, region, units sold, revenue, cost)
- Aggregates the rows and prepares them with a JavaScript node
- Google Gemini analyzes the data: KPIs, trends, anomalies, forecast and recommendations
- Sends a success report or a failure alert by email (Gmail)
- Logs chat history, dashboard data and run status back to Google Sheets

## Tools used
n8n, Google Gemini API, Google Sheets, Gmail

## How to use
1. Import `ai-excel-business-automation.json` into n8n
2. Add your own credentials (Google Sheets, Gmail, Google Gemini)
3. Replace `YOUR_SHEET_ID` with your own Google Sheet
4. Replace `your-email@example.com` with your own
