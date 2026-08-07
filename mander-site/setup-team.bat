@echo off
setlocal
cd /d "%~dp0"

rem ---------------------------------------------------------------------------
rem Copies team member photos from Claude's upload cache into public\team
rem ---------------------------------------------------------------------------

set "UPLOADS=C:\Users\herma\AppData\Roaming\Claude\local-agent-mode-sessions\80d7e550-9255-4d98-95c5-361dbe519962\10ccd66d-bf15-48cc-b9e8-86dbb2b200e1\local_037c4158-7006-48a2-a95b-bb672dee6e00\uploads"
set "DEST=public\team"

if not exist "%DEST%" mkdir "%DEST%"

rem Copy each team member photo
if exist "%UPLOADS%\herman.jpg" (
  copy /y "%UPLOADS%\herman.jpg" "%DEST%\herman.jpg" >nul
  echo  [team] herman.jpg ready
) else (
  echo  [team] herman.jpg not found - skipping
)

if exist "%UPLOADS%\danielle.jpg" (
  copy /y "%UPLOADS%\danielle.jpg" "%DEST%\danielle.jpg" >nul
  echo  [team] danielle.jpg ready
) else (
  echo  [team] danielle.jpg not found - skipping
)

if exist "%UPLOADS%\sophie.jpg" (
  copy /y "%UPLOADS%\sophie.jpg" "%DEST%\sophie.jpg" >nul
  echo  [team] sophie.jpg ready
) else (
  echo  [team] sophie.jpg not found - skipping
)

if exist "%UPLOADS%\male2.jpg" (
  copy /y "%UPLOADS%\male2.jpg" "%DEST%\male2.jpg" >nul
  echo  [team] male2.jpg ready
) else (
  echo  [team] male2.jpg not found - skipping
)

exit /b 0
