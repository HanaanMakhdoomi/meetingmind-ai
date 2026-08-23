import os
from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv

load_dotenv()

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY")
)


def transcribe_audio(file_path: str):
    with open(file_path, "rb") as audio_file:
        result = client.speech_to_text.convert(
            file=audio_file,
            model_id="scribe_v2",
        )

    return result.text