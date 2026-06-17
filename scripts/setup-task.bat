@echo off
echo Dang cai dat TSEvending Daily Content Task...

schtasks /create /tn "TSEvending-DailyContent" /tr "powershell.exe -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File \"d:\vba\tsevending\scripts\daily-run.ps1\"" /sc ONLOGON /rl HIGHEST /f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo THANH CONG! Task da duoc cai dat.
    echo Mo may la tu dong chay sau 10-40 phut.
) else (
    echo.
    echo LOI! Hay chay file nay voi quyen Administrator.
    echo Right-click vao file nay chon "Run as administrator"
)
pause
