@echo off
echo Starting AI Research Assistant Backend...
echo.
echo Installing/updating dependencies...
pip install -r requirements.txt
echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python app.py
pause
