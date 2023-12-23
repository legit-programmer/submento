from controllers import *

# convert_video_to_audio('files/video2.mp4', 'files/audio2.mp3')
segments = transcribe('files/audio2.mp3')
text = generate_srt(transcription=segments)
segments = segments_from_transcription(text, '15 sec')
print(segments)
