from convert import convert_video_to_audio
from transcribe import transcribe
from segments import segments_from_transcription

convert_video_to_audio('files/video.mp4', 'files/audio2.mp3')
text = transcribe('files/audio2.mp3')
segments_from_transcription(text, '2 min')