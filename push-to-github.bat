@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo  MANDER - push to GitHub
echo  =======================
echo.

rem --------------------------------------------------------------------------
rem 0. Is git even installed?
rem --------------------------------------------------------------------------
where git >nul 2>nul
if errorlevel 1 (
  echo  [!] Git is not installed, or not on your PATH.
  echo      Install it from https://git-scm.com/download/win then run this again.
  echo.
  pause
  exit /b 1
)

rem --------------------------------------------------------------------------
rem 1. Make sure the assets are actually in public\ before we commit.
rem    Without this, a fresh clone / Vercel deploy has no video, no team
rem    photos, and no service images.
rem --------------------------------------------------------------------------
echo  [1/6] Copying assets into public\ ...
if exist "mander-site\setup-assets.bat" call "mander-site\setup-assets.bat"
if exist "mander-site\setup-video.bat"  call "mander-site\setup-video.bat"
if exist "mander-site\setup-team.bat"   call "mander-site\setup-team.bat"
echo.

rem --------------------------------------------------------------------------
rem 2. Initialise the repo if it doesn't exist yet.
rem --------------------------------------------------------------------------
echo  [2/6] Preparing the repository ...
if not exist ".git" (
  git init >nul
  echo        Initialised a new git repository.
) else (
  echo        Repository already exists.
)

rem Make sure we're on 'main' (GitHub's default branch name).
git rev-parse --verify main >nul 2>nul
if errorlevel 1 (
  git checkout -B main >nul 2>nul
) else (
  git checkout main >nul 2>nul
)
echo.

rem --------------------------------------------------------------------------
rem 3. Point at the GitHub repo (idempotent - safe to re-run).
rem --------------------------------------------------------------------------
echo  [3/6] Setting the remote ...
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/hvndal/ManderLabs.git
  echo        Added origin.
) else (
  git remote set-url origin https://github.com/hvndal/ManderLabs.git
  echo        Updated origin.
)
echo.

rem --------------------------------------------------------------------------
rem 4. Stage everything, then SHOW what's about to be committed so you can
rem    eyeball it before anything leaves the machine.
rem --------------------------------------------------------------------------
echo  [4/6] Staging changes ...
git add -A
echo.
echo  ---- Files staged for commit -------------------------------------------
git status --short
echo  ------------------------------------------------------------------------
echo.
echo  Check the list above. node_modules, .next and .env.local should NOT
echo  appear. If they do, press Ctrl+C now and tell Claude.
echo.
pause

rem --------------------------------------------------------------------------
rem 5. Commit.
rem --------------------------------------------------------------------------
echo.
echo  [5/6] Committing ...
git diff --cached --quiet
if not errorlevel 1 (
  echo        Nothing new to commit - moving on to the push.
) else (
  git -c user.name="hvndal" -c user.email="harmanify@protonmail.com" commit -m "MANDER site: team photos, hero video, warm palette, SEO layer" >nul
  if errorlevel 1 (
    echo  [!] Commit failed. See the output above.
    pause
    exit /b 1
  )
  echo        Committed.
)
echo.

rem --------------------------------------------------------------------------
rem 6. Push. If GitHub already has commits (e.g. a README created with the
rem    repo), the first push is rejected - so we rebase onto it and retry.
rem    Nothing is discarded either way.
rem --------------------------------------------------------------------------
echo  [6/6] Pushing to GitHub ...
echo        A browser or credential prompt may appear - sign in as hvndal.
echo.
git push -u origin main
if not errorlevel 1 goto success

echo.
echo  Push was rejected - GitHub likely has commits yours don't (a README
echo  from when you created the repo). Merging those in and retrying ...
echo.
git pull --rebase origin main
if errorlevel 1 (
  echo.
  echo  [!] Could not rebase automatically. Nothing was lost - your files
  echo      are all still here. Send Claude the message above.
  pause
  exit /b 1
)

git push -u origin main
if errorlevel 1 (
  echo.
  echo  [!] Push still failed. Most common cause is authentication.
  echo      See the troubleshooting notes printed below.
  goto authhelp
)

:success
echo.
echo  ========================================================================
echo   Done. Your code is at https://github.com/hvndal/ManderLabs
echo  ========================================================================
echo.
pause
exit /b 0

:authhelp
echo.
echo  AUTHENTICATION NOTES
echo  --------------------
echo  GitHub no longer accepts account passwords over HTTPS. If you were
echo  asked for a password and it failed, do one of these:
echo.
echo   A) Easiest - install GitHub CLI from https://cli.github.com then run:
echo        gh auth login
echo      ...and run this script again.
echo.
echo   B) Or create a Personal Access Token:
echo        github.com - Settings - Developer settings -
echo        Personal access tokens - Tokens (classic) - Generate new token
echo        Tick the "repo" scope, copy the token, and paste it when git
echo        asks for your PASSWORD (username stays: hvndal).
echo.
pause
exit /b 1
