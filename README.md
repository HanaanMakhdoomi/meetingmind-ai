# 🧠 MeetingMind AI

An AI-powered meeting assistant that transforms meeting recordings into accurate transcripts and action-oriented summaries.

MeetingMind AI allows users to upload meeting audio, automatically transcribe the recording, analyze the transcript using an LLM, and extract the information that actually matters after a meeting.

## ✨ Features

- 🎙️ Upload meeting audio
- 📝 Automatic speech-to-text transcription
- 🤖 AI-generated meeting summaries
- ✅ Action item extraction
- 👤 Identify task owners
- 📅 Extract deadlines
- 📌 Extract key decisions
- ⚠️ Identify risks and blockers
- 🗄️ Store analyzed meetings
- 📚 View meeting history
- 📥 Download meeting summaries
- 🌐 Web-based interface

---

## 🏗️ Architecture

```text
                         Meeting Audio
                              │
                              ▼
                    ┌───────────────────┐
                    │   React Frontend  │
                    │      + Vite       │
                    └─────────┬─────────┘
                              │
                              │ HTTP
                              ▼
                    ┌───────────────────┐
                    │   FastAPI Backend │
                    │      Python       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ ElevenLabs Scribe │
                    │       v2          │
                    │       ASR         │
                    └─────────┬─────────┘
                              │
                              │ Transcript
                              ▼
                    ┌───────────────────┐
                    │  Gemini 2.0 Flash │
                    │       LLM         │
                    └─────────┬─────────┘
                              │
                              │ Structured JSON
                              ▼
                    ┌───────────────────┐
                    │      SQLite       │
                    │    SQLAlchemy     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   React Frontend  │
                    │                   │
                    │ Summary           │
                    │ Action Items      │
                    │ Decisions         │
                    │ Risks             │
                    └───────────────────┘
```

## 🔄 How It Works

The application follows a simple processing pipeline:

```text
Audio File
    ↓
Upload
    ↓
FastAPI Backend
    ↓
ElevenLabs Scribe v2
    ↓
Transcript
    ↓
Gemini 2.0 Flash
    ↓
Meeting Analysis
    ↓
SQLite Database
    ↓
Frontend
```

**Step 1 — Audio Upload**

The user uploads a meeting recording through the React frontend.

**Step 2 — Transcription**

The audio file is temporarily stored by the backend and sent to ElevenLabs Scribe v2.

```text
Meeting Audio → ElevenLabs Scribe v2 → Text Transcript
```

**Step 3 — AI Analysis**

The generated transcript is sent to Gemini 2.0 Flash.

```text
Transcript → Gemini 2.0 Flash → Structured Meeting Analysis
```

**Step 4 — Data Storage**

The transcript and generated analysis are stored in a SQLite database using SQLAlchemy.

**Step 5 — Results**

The frontend displays:

- Meeting transcript
- Summary
- Action items
- Decisions
- Risks

The user can also access previously analyzed meetings through the History section.

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- CSS

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite

### AI Services
- ElevenLabs Scribe v2 — Automatic Speech Recognition
- Google Gemini 2.0 Flash — LLM-based meeting analysis

## 📁 Project Structure

```text
meetingmind-ai/
│
├── backend/
│   ├── ai.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── transcription.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Analyzer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── History.jsx
│   │   │   └── ResultCard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

`.env` files and local database files are intentionally excluded from the repository.

## 🧠 AI Processing

MeetingMind AI uses two separate AI services for two different tasks.

### 1. ElevenLabs Scribe v2

Used for Automatic Speech Recognition (ASR).

```text
Audio → Text
```

The transcription service converts the uploaded meeting recording into a text transcript.

### 2. Google Gemini 2.0 Flash

Used for understanding and analyzing the transcript.

```text
Text → Structured Meeting Analysis
```

The LLM extracts:

- Summary
- Action items
- Owners
- Deadlines
- Decisions
- Risks

Separating transcription from analysis allows each component to focus on a specific task.

## 📝 LLM Prompt Design

The LLM receives the complete meeting transcript together with instructions to generate structured, action-oriented information.

The expected response format is:

```json
{
  "summary": "short but informative paragraph summarizing the meeting",
  "action_items": [
    {
      "task": "specific task that needs to be completed",
      "owner": "person responsible or null",
      "deadline": "deadline if mentioned or null"
    }
  ],
  "decisions": [
    "important decision made during the meeting"
  ],
  "risks": [
    "important risk, concern, blocker, or uncertainty"
  ]
}
```

The prompt contains rules designed to improve reliability:

- Only use information supported by the transcript.
- Do not invent names.
- Do not invent deadlines.
- Do not invent decisions.
- Do not invent tasks.
- Use `null` when an owner is not mentioned.
- Use `null` when a deadline is not mentioned.
- Keep the summary concise but informative.
- Extract only meaningful decisions.
- Include risks only when they are actually discussed.
- Return valid JSON.

A low temperature is used to make the generated results more consistent.

## 📊 Example

**Meeting Transcript**

```text
Alex: We need to complete the final testing before launch.

Sarah: I'll take care of the testing.

Alex: Can you finish it by Friday?

Sarah: Yes.

John: I'll prepare the deployment checklist.

Alex: Perfect. We'll launch after testing is complete.
```

**AI Output**

```json
{
  "summary": "The team discussed final preparations for the product launch and agreed that testing must be completed before deployment.",
  "action_items": [
    {
      "task": "Complete final product testing",
      "owner": "Sarah",
      "deadline": "Friday"
    },
    {
      "task": "Prepare the deployment checklist",
      "owner": "John",
      "deadline": null
    }
  ],
  "decisions": [
    "The product will be launched after final testing is completed."
  ],
  "risks": []
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/` | Backend health check |
| POST | `/analyze` | Analyze a text transcript |
| POST | `/analyze-audio` | Upload audio and analyze a meeting |
| GET | `/history` | Retrieve all analyzed meetings |
| GET | `/history/{meeting_id}` | Retrieve a specific meeting |

## 🗄️ Database

MeetingMind AI uses SQLite with SQLAlchemy.

Each meeting stores:

```text
Meeting
├── ID
├── Transcript
├── Summary
├── Action Items
├── Decisions
├── Risks
└── Created At
```

The database allows users to return to previously analyzed meetings without processing the original audio again.

## 🔐 Environment Variables

API keys are stored using environment variables.

Create a `.env` file inside the `backend` directory:

```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Never commit API keys to GitHub.

The `.gitignore` file includes:

```text
.env
.env.local
*.db
*.sqlite
*.sqlite3
meetingmind.db
```

## 🚀 Installation

### Prerequisites

Make sure the following are installed:

- Python 3.10+
- Node.js
- npm
- Git

You will also need API keys for:

- ElevenLabs
- Google Gemini

### ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env` and add:

```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### 💻 Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `frontend/.env` and add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🖥️ Application Workflow

1. **Open the Application** — The user opens the MeetingMind AI web application.
2. **Upload a Meeting** — The user selects an audio recording.
3. **Transcribe** — The backend sends the recording to ElevenLabs Scribe v2.
4. **Analyze** — The resulting transcript is sent to Gemini 2.0 Flash.
5. **Display Results** — The application displays:
   - 📝 Summary
   - ✅ Action Items
   - 📌 Decisions
   - ⚠️ Risks
6. **Store** — The transcript and analysis are stored in SQLite.
7. **Review** — The user can open the History section and review previous meetings.
8. **Download** — The generated analysis can be downloaded as a Markdown report.

## 🔒 Security

MeetingMind AI follows basic security practices:

- API keys are stored in environment variables.
- API keys are not hard-coded in source files.
- `.env` files are excluded from Git.
- Local database files are excluded from Git.
- Uploaded audio is stored temporarily during processing.
- Temporary audio files are deleted after processing.

## ⚠️ Limitations

Current limitations include:

- No user authentication.
- SQLite is intended for lightweight deployments.
- Speaker identification is not currently implemented.
- The system depends on external AI APIs.
- Very large audio files may require additional upload limits.
- Internet connectivity is required for the external AI services.

## 🔮 Future Improvements

Future versions could include:

- 🎤 Real-time transcription
- 👥 Speaker identification
- 🌍 Multi-language support
- 📅 Calendar integration
- 📧 Automatic follow-up email generation
- ✅ Automatic task creation
- 📄 PDF report generation
- 🔐 User authentication
- ☁️ Cloud database integration
- 📊 Meeting analytics
- 🔎 Search across meeting history
- 🗣️ Speaker-specific summaries

## 🌐 Deployment

The frontend and backend can be deployed separately.

**Frontend**

Recommended platforms:
- Vercel
- Netlify

**Backend**

Recommended platforms:
- Render
- Railway
- Other Python-compatible hosting services

After deploying the backend, update the frontend environment variable:

```env
VITE_API_URL=YOUR_DEPLOYED_BACKEND_URL
```

API keys should be added as environment variables on the backend hosting platform.

## 🎥 Demo Video

The demo video demonstrates the complete workflow:

- Launching MeetingMind AI
- Uploading a meeting recording
- Processing the audio
- Generating the transcript
- Generating the meeting summary
- Extracting action items
- Identifying decisions
- Identifying risks
- Saving the meeting
- Viewing meeting history
- Opening a previous meeting
- Downloading the meeting report

**Demo Video:** ADD_DEMO_VIDEO_LINK_HERE

## 🎓 Assignment Requirements

This project directly addresses the Meeting Summarizer assignment requirements.

| Assignment Requirement | Implementation |
|--------------------------|--------------------------------------|
| Meeting audio input | React audio upload |
| Text transcript | ElevenLabs Scribe v2 |
| ASR API integration | ElevenLabs Scribe v2 |
| Backend processing | FastAPI |
| LLM integration | Google Gemini 2.0 Flash |
| Meeting summary | Gemini-generated summary |
| Key decisions | LLM extraction |
| Action items | LLM extraction |
| Task owners | LLM extraction |
| Deadlines | LLM extraction |
| Risks | LLM extraction |
| Data storage | SQLite + SQLAlchemy |
| Frontend | React + Vite |
| Meeting history | `/history` API + React History page |
| GitHub repository | Project repository |
| Demo video | Demonstration of complete workflow |

## 📈 Evaluation Focus

**Transcription Accuracy**

Meeting audio is processed using ElevenLabs Scribe v2, an ASR service designed for speech transcription.

**Summary Quality**

Gemini 2.0 Flash analyzes the transcript and produces a concise summary focused on the important information discussed during the meeting.

**LLM Prompt Effectiveness**

The prompt uses explicit instructions and a fixed JSON schema to produce consistent, structured, and action-oriented results. It also instructs the model not to fabricate information.

**Code Structure**

The application separates its major responsibilities:

```text
Frontend
    ↓
API Layer
    ↓
Transcription
    ↓
LLM Analysis
    ↓
Database
```

This makes the project easier to understand, maintain, and extend.

## 📸 Screenshots

Add screenshots of the application here.

Recommended screenshots:

- Landing page
- Audio upload interface
- Processing state
- Generated transcript
- Summary
- Action items
- Decisions
- Risks
- Meeting history
- Meeting details

## 📌 Project Status

- ✅ React frontend
- ✅ FastAPI backend
- ✅ Audio upload
- ✅ ElevenLabs transcription
- ✅ Gemini analysis
- ✅ Structured JSON output
- ✅ Action item extraction
- ✅ Decision extraction
- ✅ Risk extraction
- ✅ SQLite database
- ✅ Meeting history
- ✅ Markdown download
- 🚧 Deployment
- 🚧 Demo video

## 👨‍💻 About

MeetingMind AI was developed as a meeting summarization project focused on combining Automatic Speech Recognition, Large Language Models, backend APIs, and a modern web interface into a single practical application.

The main goal is simple: **turn long meetings into clear next steps.**

## 📜 License

This project was developed for academic and educational purposes.