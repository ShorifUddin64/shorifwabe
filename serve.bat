@echo off
cd /d "%~dp0"
echo Starting a local server on http://localhost:8000 ... (close this window to stop)
start "" http://localhost:8000
python -m http.server 8000
if errorlevel 1 py -m http.server 8000
if errorlevel 1 echo.& echo Python was not found. Install it from python.org, or use VS Code Live Server (see HOW-TO-RUN.txt).
pause
