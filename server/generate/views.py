from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .supabase_controllers import *
from .process_controllers import *

@api_view(['POST'])
def generate(request):
    data = dict(request.data)
    fileName = data.get('file_name')[0]
    segmentLength = data.get('segment_length')[0]
    # uuid = data.get('user_id')
    print(fileName)
    print(segmentLength)

    downloadVideo(fileName)
    convert_video_to_audio(f'files/{fileName}.mp4', f'files/{fileName}.mp3')
    segments = transcribe(f'files/{fileName}.mp3')
    text = generate_srt(transcription=segments)
    segments = segments_from_transcription(text, segmentLength)
    print(segments)

    return Response("Generated!", status=status.HTTP_200_OK)


