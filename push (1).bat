@echo off
cd /d %~dp0

echo ==================================
echo      Vraj Portfolio Git Push
echo ==================================

REM Add all files
git add .

REM Commit with timestamp
for /f %%i in ('wmic os get localdatetime ^| find "."') do set datetime=%%i
set timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%
git commit -m "Auto push on %timestamp%"

REM Push to GitHub
git push -u origin main

echo.
echo ✅ Push complete! Check GitHub.
pause
