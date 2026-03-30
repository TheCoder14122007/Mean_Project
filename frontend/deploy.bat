@echo off
echo Building Angular app for production...
ng build --configuration=production

echo.
echo Deploying to Firebase...
firebase deploy

echo.
echo Deployment complete!
echo Your app should be live at: https://your-firebase-project-id.web.app
pause