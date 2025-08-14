# 🚀 Ollama AI Setup Guide

## 📋 **Quick Steps to Install and Setup Ollama AI Locally**

### 1. **Install Ollama**
- Go to [ollama.ai](https://ollama.ai)
- Click **"Download"** and choose your operating system
- Install the application
- Make sure Ollama is running in the background

### 2. **Download Required Model**
Open Terminal/Command Prompt and type:
```bash
ollama pull qwen2.5:0.5b
```
This model is perfect for creating high-quality news articles.

### 3. **Start Ollama Service**
```bash
ollama serve
```
Leave this command running in a separate Terminal.

### 4. **Test Connection**
Open a new Terminal and type:
```bash
curl http://localhost:11434/api/tags
```
You should see a list of available models.

### 5. **Add Environment Variables**
Create a `.env.local` file in the main directory and add:
```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

### 6. **Test the System**
```bash
pnpm ai:once
```

---

## 🆓 **Local Ollama Features**
- **No request limits** - Use as much as you want
- **High speed** - Works locally without network delay
- **Complete privacy** - Data never leaves your device
- **Powerful models** like qwen2.5:0.5b
- **No credit card required**

---

## 🔧 **If You Encounter Problems**

### **"Connection refused"**
- Make sure `ollama serve` is running
- Check that Ollama is running on port 11434

### **"Model not found"**
- Make sure the model is downloaded: `ollama pull qwen2.5:0.5b`
- Check model list: `ollama list`

### **"Ollama is not running"**
- Start Ollama service: `ollama serve`
- Make sure the application is installed correctly

---

## 📊 **System Requirements**
- **RAM**: At least 4GB (8GB recommended)
- **Storage**: 3GB free space for the model
- **OS**: Windows 10+, macOS 10.15+, Linux

---

## 📞 **Help**
- [Ollama Documentation](https://ollama.ai/docs)
- [Ollama GitHub](https://github.com/ollama/ollama)
- [Community Discord](https://discord.gg/ollama)

---

**🎉 Now you can create unlimited articles without cost!**
