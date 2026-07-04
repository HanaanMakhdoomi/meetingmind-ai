import os
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_meeting(transcript: str):
    prompt = f"""
You are an AI meeting assistant.

Analyze the following meeting transcript and return ONLY valid JSON with this exact structure:

{{
  "summary": "short paragraph",
  "action_items": [
    {{"task": "string", "owner": "string or null", "deadline": "string or null"}}
  ],
  "decisions": ["string"],
  "risks": ["string"]
}}

Rules:
- Do NOT include markdown formatting.
- Do NOT wrap the JSON in triple backticks.
- Do NOT add any explanation text.
- Return raw JSON only.

Transcript:
{transcript}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    raw = response.choices[0].message.content.strip()

    # Remove triple backticks like ```json ... ```
    raw = re.sub(r"^```(?:json)?", "", raw).strip()
    raw = re.sub(r"```$", "", raw).strip()

    return raw