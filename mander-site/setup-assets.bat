@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

rem ---------------------------------------------------------------------------
rem Copies the six service photos from Pictures\our services into public\services
rem and renames them to the slugs the site expects. Safe to re-run.
rem ---------------------------------------------------------------------------

set "SRC=%USERPROFILE%\Pictures\our services"
set "DEST=public\services"

if not exist "%SRC%" (
  echo  [assets] Source folder not found: "%SRC%"
  echo  [assets] Skipping - service tiles will fall back to the gradient.
  exit /b 0
)

if not exist "%DEST%" mkdir "%DEST%"

call :copyone "website design.jpg" "website-design.jpg"
call :copyone "branding.jpg"       "brand-identity.jpg"
call :copyone "redesign.jpg"       "website-redesign.jpg"
call :copyone "seo.jpg"            "seo.jpg"
call :copyone "gbr.jpg"            "gbp-optimization.jpg"
call :copyone "care plan.jpg"      "care-plan.jpg"

echo  [assets] Service images ready in %DEST%
exit /b 0

:copyone
if exist "%SRC%\%~1" (
  copy /y "%SRC%\%~1" "%DEST%\%~2" >nul
  echo  [assets] %~1  ->  %~2
) else (
  echo  [assets] missing: %~1
)
exit /b 0
