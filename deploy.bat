@echo off
:: Stage all changes
git add .

:: Commit with timestamp
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set mydate=%%c-%%b-%%a
for /f "tokens=1-3 delims=:." %%a in ("%time%") do set mytime=%%a-%%b-%%c
git commit -m "Auto-commit: %mydate%_%mytime%"

:: Push to GitHub
git push origin main