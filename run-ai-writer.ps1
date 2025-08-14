# GlobalEye News - AI Article Writer PowerShell Script
# Run this script to start the AI article generation system

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GlobalEye News - AI Article Writer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set working directory to script location
Set-Location $PSScriptRoot
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green

# Load environment variables from .env.local file
$envFile = Join-Path $PSScriptRoot ".env.local"
if (Test-Path $envFile) {
    Write-Host "Loading environment variables from .env.local..." -ForegroundColor Green
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Variable -Name $name -Value $value -Scope Global
            Set-Item -Path "env:$name" -Value $value
        }
    }
} else {
    Write-Host "WARNING: .env.local file not found!" -ForegroundColor Yellow
    Write-Host "Please create .env.local file with your API keys" -ForegroundColor Yellow
}

# Set default values if not in .env.local
if (-not $env:OLLAMA_HOST) { $env:OLLAMA_HOST = "http://localhost:11434" }
if (-not $env:OLLAMA_MODEL) { $env:OLLAMA_MODEL = "llama3.1" }

Write-Host "Environment variables loaded:" -ForegroundColor Green
Write-Host "- OLLAMA_HOST: $env:OLLAMA_HOST" -ForegroundColor Yellow
Write-Host "- OLLAMA_MODEL: $env:OLLAMA_MODEL" -ForegroundColor Yellow
if ($env:PEXELS_API_KEY) {
    Write-Host "- PEXELS_API_KEY: [SET]" -ForegroundColor Green
} else {
    Write-Host "- PEXELS_API_KEY: [NOT SET]" -ForegroundColor Red
}
if ($env:UNSPLASH_ACCESS_KEY) {
    Write-Host "- UNSPLASH_ACCESS_KEY: [SET]" -ForegroundColor Green
} else {
    Write-Host "- UNSPLASH_ACCESS_KEY: [NOT SET]" -ForegroundColor Red
}
Write-Host ""

# Check if pnpm is available
try {
    $pnpmVersion = pnpm --version
    Write-Host "pnpm version: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: pnpm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install pnpm first: npm install -g pnpm" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Ollama is running
Write-Host "Checking Ollama connection..." -ForegroundColor Yellow
try {
    $ollamaResponse = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method GET -TimeoutSec 5
    Write-Host "✅ Ollama is running and accessible" -ForegroundColor Green
    
    if ($ollamaResponse.models -and $ollamaResponse.models.Count -gt 0) {
        Write-Host "Available models:" -ForegroundColor Green
        foreach ($model in $ollamaResponse.models) {
            Write-Host "  - $($model.name)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠️  No models found. Run 'ollama pull llama3.1' to download a model." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Cannot connect to Ollama at $env:OLLAMA_HOST" -ForegroundColor Yellow
    Write-Host "Please make sure Ollama is running and accessible" -ForegroundColor Yellow
    Write-Host "You can start Ollama by running: ollama serve" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting AI article generation..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the process" -ForegroundColor Yellow
Write-Host ""

# Run the AI writer in cron mode
try {
    pnpm ai:cron
} catch {
    Write-Host ""
    Write-Host "AI Writer stopped due to an error." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "AI Writer stopped." -ForegroundColor Cyan
Read-Host "Press Enter to exit"
