@echo off
setlocal
cd /d "%~dp0"

echo.
echo  MANDER - local development server
echo  ---------------------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js was not found on this machine.
  echo  Install it from https://nodejs.org (LTS^), then run this file again.
  echo.
  pause
  exit /b 1
)

call "%~dp0setup-assets.bat"
call "%~dp0setup-video.bat"
call "%~dp0setup-team.bat"

rem Install if node_modules is missing entirely, OR if a specific dependency
rem (framer-motion, added for the interactive pricing / motion system) isn't
rem there yet. Guards against "it worked before, now it says Module not found"
rem after pulling an update that added a new package.json dependency.
if not exist "node_modules" (
  echo  Installing dependencies. This only happens once...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  npm install failed. See the messages above.
    pause
    exit /b 1
  )
) else if not exist "node_modules\framer-motion" (
  echo  New dependency detected ^(framer-motion^) - updating packages...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  npm install failed. See the messages above.
    pause
    exit /b 1
  )
)

echo.
echo  Starting the dev server on http://localhost:3000
echo  Press Ctrl+C in this window to stop it.
echo.

start "" http://localhost:3000
call npm run dev

pause
