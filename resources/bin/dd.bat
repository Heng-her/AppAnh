@echo off
echo Testing Facebook cookies...
echo.

REM Test if yt-dlp and cookies.txt exist
if not exist "yt-dlp.exe" (
    echo ERROR: yt-dlp.exe not found in current directory
    pause
    exit /b 1
)

if not exist "cookies.txt" (
    echo ERROR: cookies.txt not found in current directory
    pause
    exit /b 1
)

echo ✅ Found yt-dlp.exe and cookies.txt
echo.

REM Test cookies with a simple Facebook page
echo Testing cookies with Facebook...
echo This will attempt to access Facebook using your cookies.txt
echo.

yt-dlp.exe --cookies cookies.txt --simulate --print "title,url" "https://www.facebook.com" 2>&1

echo.
echo Test completed. Check the output above:
echo - If you see errors about login/cookies, your cookies.txt needs updating
echo - If you see "title" information, your cookies are working
echo.
pause