import whisper
import os
model = whisper.load_model("base")
path = os.path.join(os.getcwd(), 'files/harvard.wav') 

result = model.transcribe(audio=path, verbose=True)
print(result["text"])