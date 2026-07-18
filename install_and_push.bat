@echo off
echo Installing Cloudinary package...
call npm install
echo.
echo Pushing code to GitHub...
git add .
git commit -m "Integrate Cloudinary for Image Uploads"
git push origin main
echo.
echo Done! Please don't forget to add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your Vercel Dashboard.
pause
