from process_controllers import *
from supabase_controllers import *

file_name = "video2" # not include extension

downloadVideo(file_name)
convert_video_to_audio(f'files/{file_name}.mp4', f'files/{file_name}.mp3')
segments = transcribe(f'files/{file_name}.mp3')
text = generate_srt(transcription=segments)
segments = segments_from_transcription(text, '15 sec')
print(segments)
