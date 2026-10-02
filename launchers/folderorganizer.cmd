@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo FolderOrganizer requires Node.js 22.13.0 or newer.
  echo Install Node.js and try again.
  pause
  exit /b 1
)

node index.js %*
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" pause
exit /b %EXIT_CODE%
