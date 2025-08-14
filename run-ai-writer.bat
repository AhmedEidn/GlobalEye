@echo off
echo ========================================
echo GlobalEye News - AI Article Writer
echo ========================================
echo.

REM Set working directory
cd /d "%~dp0"
echo Working directory: %CD%

REM Load environment variables from .env.local file
if exist ".env.local" (
    echo Loading environment variables from .env.local...
    for /f "tokens=1,2 delims==" %%a in (.env.local) do (
        if not "%%a"=="" if not "%%a:~0,1%"=="#" (
            set "%%a=%%b"
        )
    )
) else (
    echo WARNING: .env.local file not found!
    echo Please create .env.local file with your API keys
)

REM Set default values if not in .env.local
if not defined OLLAMA_HOST set OLLAMA_HOST=http://localhost:11434
if not defined OLLAMA_MODEL set OLLAMA_MODEL=llama3.1

echo Environment variables loaded:
echo - OLLAMA_HOST: %OLLAMA_HOST%
echo - OLLAMA_MODEL: %OLLAMA_MODEL%
if defined PEXELS_API_KEY (
    echo - PEXELS_API_KEY: [SET]
) else (
    echo - PEXELS_API_KEY: [NOT SET]
)
if defined UNSPLASH_ACCESS_KEY (
    echo - UNSPLASH_ACCESS_KEY: [SET]
) else (
    echo - UNSPLASH_ACCESS_KEY: [NOT SET]
)
echo.

REM Check if pnpm is available
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: pnpm is not installed or not in PATH
    echo Please install pnpm first: npm install -g pnpm
    pause
    exit /b 1
)

REM Check if Ollama is running
echo Checking Ollama connection...
curl -s http://localhost:11434/api/tags >nul 2>nul
if %errorlevel% neq 0 (
    echo WARNING: Cannot connect to Ollama at %OLLAMA_HOST%
    echo Please make sure Ollama is running and accessible
    echo.
)

echo Starting AI article generation...
echo Press Ctrl+C to stop the process
echo.

REM Run the AI writer in cron mode
pnpm ai:cron

echo.
echo AI Writer stopped.
pause
