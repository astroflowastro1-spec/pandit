@echo off
echo Pushing code to GitHub...
git add .
git commit -m "Updates"
git push origin main
echo.
echo Done! Press any key to exit.
pause
