# 🧠 MeetingMind AI

> Turn messy meetings into clear action.

MeetingMind AI is a full-stack AI-powered meeting assistant that transforms raw transcripts into structured, actionable insights — instantly.

Paste any meeting transcript (or upload a `.txt` file), and the AI extracts:
- 📝 **Summary** — A crisp paragraph capturing key points
- ✅ **Action items** — With owners and deadlines
- 📌 **Decisions** — Everything that was agreed on
- ⚠️ **Risks** — Potential blockers or concerns

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

### Frontend
- **React** — UI library
- **Vite** — Lightning-fast build tool
- **Axios** — API communication
- **Custom CSS design system** — Fraunces + Inter + JetBrains Mono

---

## 🚀 Getting Started

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

If you find this helpful, plaese give it a star ✨ and check out my other repos too...

This is what real AI engineering looks like beyond the notebook.

📄 License
MIT

Made with 🔥🌿 by Vivi
