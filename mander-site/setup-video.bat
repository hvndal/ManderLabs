@echo off
setlocal
cd /d "%~dp0"

rem ---------------------------------------------------------------------------
rem Copies the hero showcase video from Claude's upload cache into
rem public\videos\hero.mp4. That upload cache is tied to the chat session it
rem came from, so this only works if you run it while that conversation is
rem still around. If it's gone, re-attach the video in chat and ask for a
rem fresh copy of this script with the new path. Safe to re-run.
rem ---------------------------------------------------------------------------

set "SRC=C:\Users\herma\AppData\Roaming\Claude\local-agent-mode-sessions\80d7e550-9255-4d98-95c5-361dbe519962\10ccd66d-bf15-48cc-b9e8-86dbb2b200e1\local_037c4158-7006-48a2-a95b-bb672dee6e00\uploads\20765858-hd_1920_1080_25fps.mp4"
set "DEST=public\videos"

if not exist "%SRC%" (
  echo  [video] Source file not found - it may have expired with the chat session.
  echo  [video] Skipping - the hero will fall back to the still image.
  echo  [video] Re-attach the video in chat if you want it wired back in.
  exit /b 0
)

if not exist "%DEST%" mkdir "%DEST%"

copy /y "%SRC%" "%DEST%\hero.mp4" >nul
echo  [video] Hero video ready at public\videos\hero.mp4
exit /b 0
