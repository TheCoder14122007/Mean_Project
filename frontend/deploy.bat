@echo off
echo Building Angular app for production...
ng build --configuration=production

echo.
echo Deploying to Firebase...
firebase deploy

echo.
echo Deployment complete!
echo Your app should be live at: https://school-management-site-963b7.web.app
pause