import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_meeting(transcript: str):

    prompt = f"""
You are MeetingMind AI, an AI assistant specialized in analyzing business
and team meeting transcripts.

Your task is to transform the transcript into a concise, accurate,
action-oriented meeting report.

Return ONLY valid JSON using exactly this structure:

{{
  "summary": "A concise 3-5 sentence summary of the meeting.",
  "action_items": [
    {{
      "task": "A specific and actionable task.",
      "owner": "The person responsible, or null if not mentioned.",
      "deadline": "The deadline, or null if not mentioned."
    }}
  ],
  "decisions": [
    "A clear decision that was explicitly made."
  ],
  "risks": [
    "A significant blocker, concern, dependency, or uncertainty."
  ]
}}

IMPORTANT RULES:

1. Use ONLY information explicitly supported by the transcript.
2. Never invent or assume information.
3. Do not create an action item unless the transcript indicates that
   someone needs to do something.
4. Action items must describe a concrete task rather than a vague goal.
5. Identify the responsible person only when explicitly mentioned.
6. Identify a deadline only when explicitly mentioned.
7. Use null for unknown owners or deadlines.
8. Extract only decisions that were actually made or agreed upon.
9. Extract risks, blockers, dependencies, or unresolved concerns only
   when they are discussed in the meeting.
10. Do not treat general discussion as a decision.
11. Do not treat suggestions as completed decisions.
12. Keep the summary focused on the purpose, important discussion,
    outcomes, and next steps.
13. Avoid unnecessary details, repetition, and filler.
14. If there are no action items, return an empty array.
15. If there are no decisions, return an empty array.
16. If there are no risks, return an empty array.
17. Return valid JSON only. Do not use Markdown or code fences.

MEETING TRANSCRIPT:

{transcript}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json",
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError("Gemini returned an invalid JSON response.")