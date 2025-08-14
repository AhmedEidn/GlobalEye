# 🚀 GlobalEye AI News - Deployment Guide

## 📋 **Overview**
This guide covers deploying the GlobalEye AI news generation system using **Ollama local models** for AI content generation.

## 🆓 **Free Resources Used**
- **Ollama Local Models**: Unlimited free requests
- **Pexels API**: Free royalty-free images  
- **Unsplash API**: Free high-quality photos
- **No local AI models required**

---

## 🪟 **Windows Deployment**

### **Option 1: Windows Task Scheduler (Recommended)**

#### 1. **Create Batch File**
Create `run-ai-writer.bat` in your project root:

```batch
@echo off
echo ========================================
echo GlobalEye News - AI Article Writer
echo ========================================
echo.
REM Set working directory
cd /d "%~dp0"
echo Working directory: %CD%

REM Set environment variables

set PEXELS_API_KEY=your_pexels_api_key_here
set UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

echo Environment variables set:

echo - PEXELS_API_KEY: %PEXELS_API_KEY%
echo - UNSPLASH_ACCESS_KEY: %UNSPLASH_ACCESS_KEY%
echo.

REM Check if pnpm is available
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: pnpm is not installed or not in PATH
    echo Please install pnpm first: npm install -g pnpm
    pause
    exit /b 1
)

echo Starting AI article generation...
echo Press Ctrl+C to stop the process
echo.

REM Run the AI writer in cron mode
pnpm ai:cron

echo.
echo AI Writer stopped.
pause
```

#### 2. **Set Up Task Scheduler**
1. Open **Task Scheduler** (search in Start menu)
2. Click **"Create Basic Task"**
3. **Name**: `GlobalEye AI Writer`
4. **Trigger**: Daily, every 1 hour
5. **Action**: Start a program
6. **Program**: `C:\Windows\System32\cmd.exe`
7. **Arguments**: `/c "C:\path\to\your\project\run-ai-writer.bat"`
8. **Start in**: `C:\path\to\your\project`

#### 3. **Advanced Task Settings**
- **Run whether user is logged on or not**
- **Run with highest privileges**
- **Stop the task if it runs longer than**: 2 hours
- **If the task fails, restart every**: 5 minutes, up to 3 restarts

### **Option 2: PowerShell Script**
Create `run-ai-writer.ps1`:

```powershell
# GlobalEye News - AI Article Writer PowerShell Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GlobalEye News - AI Article Writer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set working directory to script location
Set-Location $PSScriptRoot
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green

# Set environment variables

$env:PEXELS_API_KEY = "your_pexels_api_key_here"
$env:UNSPLASH_ACCESS_KEY = "your_unsplash_access_key_here"

Write-Host "Environment variables set:" -ForegroundColor Green

Write-Host "- PEXELS_API_KEY: $env:PEXELS_API_KEY" -ForegroundColor Yellow
Write-Host "- UNSPLASH_ACCESS_KEY: $env:UNSPLASH_ACCESS_KEY" -ForegroundColor Yellow
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
```

---

## 🐧 **Linux Deployment**

### **Option 1: Systemd Service (Recommended)**

#### 1. **Create Service File**
Create `/etc/systemd/system/globaleye-ai.service`:

```ini
[Unit]
Description=GlobalEye AI News Writer
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/your/project

Environment=PEXELS_API_KEY=your_pexels_key_here
Environment=UNSPLASH_ACCESS_KEY=your_unsplash_key_here
Environment=SITE_URL=https://globaleye.live
ExecStart=/usr/bin/pnpm ai:cron
Restart=always
RestartSec=300

[Install]
WantedBy=multi-user.target
```

#### 2. **Enable and Start Service**
```bash
sudo systemctl daemon-reload
sudo systemctl enable globaleye-ai
sudo systemctl start globaleye-ai
sudo systemctl status globaleye-ai
```

#### 3. **View Logs**
```bash
sudo journalctl -u globaleye-ai -f
```

### **Option 2: Cron Job**
```bash
# Edit crontab
crontab -e

# Add this line for hourly execution
0 * * * * cd /path/to/your/project && pnpm ai:once
```

---

## 🐳 **Docker Deployment**

### **1. Create Dockerfile**
```dockerfile
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build AI writer
RUN pnpm ai:build

# Set environment variables
ENV NODE_ENV=production


# Expose port (if needed)
EXPOSE 3000

# Start AI writer
CMD ["pnpm", "ai:cron"]
```

### **2. Build and Run**
```bash
# Build image
docker build -t globaleye-ai .

# Run container
docker run -d \
  --name globaleye-ai \
  --env-file .env.local \
  --restart unless-stopped \
  globaleye-ai

# View logs
docker logs -f globaleye-ai
```

---

## ☁️ **Cloud Deployment**

### **AWS Lambda + EventBridge**
1. **Package the AI writer** as a Lambda function
2. **Set up EventBridge** rule for hourly execution
3. **Configure environment variables** in Lambda
4. **Set timeout** to 15 minutes

### **Google Cloud Functions + Cloud Scheduler**
1. **Deploy function** with hourly trigger
2. **Set environment variables**
3. **Configure memory** and timeout

### **Azure Functions + Timer Trigger**
1. **Create function** with CRON expression
2. **Set environment variables**
3. **Configure execution time**

---

## 🔧 **Environment Configuration**

### **Required Variables**
```env
# Ollama AI (Required - Local Installation)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b

# Image APIs (Required)
PEXELS_API_KEY=your_pexels_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Site Configuration (Optional)
SITE_URL=https://globaleye.live
AI_WRITER_MODE=cron
```

### **Optional Variables**
```env
# Custom model selection
OLLAMA_MODEL=llama3.1  # or any other Ollama model

# Custom execution mode
AI_WRITER_MODE=once  # or 'cron'
```

---

## 📊 **Monitoring and Logs**

### **Check Status**
```bash
# View recent logs
tail -f logs/ai-writer.log

# Check system status
systemctl status globaleye-ai  # Linux
sc query globaleye-ai          # Windows

# View Docker logs
docker logs -f globaleye-ai
```

### **Performance Metrics**
- **Articles generated per hour**: 8 (one per category)
- **API usage**: ~16 requests/hour (8 articles + 8 images)
- **Monthly usage**: ~480 requests (well within 1000 free limit)
- **Storage**: ~1-2 MB per article

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **"Rate limit exceeded"**
- Check Ollama model availability
- Wait for monthly reset
- Consider upgrading to paid plan

#### **"Model is loading"**
- Wait 1-2 minutes for first request
- Model loads automatically on first use

#### **"Invalid API key"**
- Verify API key is correct
- Check for extra spaces
- Ensure key has proper permissions

#### **Service won't start**
- Check environment variables
- Verify file paths
- Check user permissions

### **Debug Mode**
```bash
# Run with verbose logging
DEBUG=* pnpm ai:once

# Check specific component
pnpm ai:build && node scripts/ai-writer/dist/index.js once
```

---

## 📈 **Scaling Considerations**

### **Free Tier Limits**
- **Ollama**: Unlimited requests
- **Pexels**: 200 requests/hour
- **Unsplash**: 50 requests/hour

### **Upgrade Paths**
1. **Ollama Pro**: Free, unlimited requests
2. **Pexels Pro**: $7/month, unlimited requests
3. **Unsplash Pro**: $5/month, unlimited requests

---

## 🎯 **Best Practices**

1. **Monitor API usage** to stay within limits
2. **Use environment variables** for sensitive data
3. **Implement proper logging** for debugging
4. **Set up health checks** for production
5. **Backup generated content** regularly
6. **Test thoroughly** before production deployment

---

**🚀 Your AI news generation system is now ready for production!** 