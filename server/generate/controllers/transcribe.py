import whisper
import os

def transcribe(audio_path:str):
    """Transcibes audio with timestamps"""

    model = whisper.load_model("base")
    path = os.path.join(os.getcwd(), audio_path) 
    result = model.transcribe(audio=path, verbose=True)
    return result["text"]

