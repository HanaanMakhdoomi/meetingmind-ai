# 🧠 MeetingMind AI

> Turn messy meetings into clear action.

<p align="center">
  <a href="https://meetingmind-ai-gold.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Try_Now-F59E0B?style=for-the-badge&labelColor=0F0F0F" alt="Live Demo" />
  </a>
  <a href="https://github.com/bistighosh16/meetingmind-ai">
    <img src="https://img.shields.io/badge/⭐_GitHub-Source_Code-84CC16?style=for-the-badge&labelColor=0F0F0F" alt="GitHub" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-Llama_3.3-F55036?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-84CC16?style=flat-square" />
</p>

---

MeetingMind AI is a full-stack AI-powered meeting assistant that transforms raw transcripts into structured, actionable insights — instantly.

Paste any meeting transcript (or upload a `.txt` file), and the AI extracts:
- 📝 **Summary** — A crisp paragraph capturing key points
- ✅ **Action items** — With owners and deadlines
- 📌 **Decisions** — Everything that was agreed on
- ⚠️ **Risks** — Potential blockers or concerns

---

## 🌐 Live Demo

### 👉 [meetingmind-ai-gold.vercel.app](https://meetingmind-ai-gold.vercel.app/)

---

## ✨ Features

- 🧠 AI-powered structured extraction using Llama 3.3 70B
- 📎 Upload `.txt` or `.md` transcripts
- 💾 Persistent meeting history (SQLite-backed)
- 📥 One-click Markdown export
- 🎨 Custom design system — Sunset Boardroom theme (🔥🌿)
- ✨ Fade-in animations, skeleton loading, and success toasts
- ⚛️ Component-based React architecture
- 🐍 Async FastAPI backend with auto-generated Swagger docs

---

## 🛠 Tech Stack

### Backend
- **Python 3.11**
- **FastAPI** — Modern async web framework
- **SQLAlchemy + SQLite** — Database ORM & storage
- **Groq API** — Llama 3.3 70B inference
- **Pydantic** — Data validation
- **Deployed on Render**

### Frontend
- **React** — UI library
- **Vite** — Lightning-fast build tool
- **Axios** — API communication
- **Custom CSS design system** — Fraunces + Inter + JetBrains Mono
- **Deployed on Vercel**

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Python 3.11
- Node.js 18+
- Groq API key ([get one free](https://console.groq.com))

### Backend Setup

cd backend
py -3.11 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Create a .env file inside backend/:

GROQ_API_KEY=your_key_here
Run the server:

uvicorn main:app --reload
Backend runs on http://127.0.0.1:8000

Frontend Setup

cd frontend
npm install
Create a .env file inside frontend/:


VITE_API_URL=http://127.0.0.1:8000
Run the dev server:


npm run dev
Frontend runs on http://localhost:5173

🎨 Design Philosophy
Sunset Boardroom — a warm executive palette pairing rich amber tones with sage green accents for balance and taste.

Warm charcoal canvas
Amber → peach gradient primaries
Sage green highlights for success + accents
Editorial spacing and Fraunces serif headlines
Inspired by the design ethos of Stripe, Vercel, and Framer.

🧠 Why I Built This
Every AI project I built before this was Streamlit-only. MeetingMind AI was my first real leap into full-stack architecture — separating frontend and backend, building REST APIs, integrating a database, and shipping a real product experience.

This is what real AI engineering looks like beyond the notebook.

📄 License
MIT

<p align="center"> Made with 🔥🌿 by <a href="https://github.com/bistighosh16">Vivi</a> </p> ```
