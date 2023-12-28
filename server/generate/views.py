from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .supabase_controllers import *
from .process_controllers import *


@api_view(['POST'])
def generate(request):
    data = dict(request.data)
    segmentLength: str = data.get('segment_length')
    uuid: str = data.get('user_id')
    fileName: str = uuid + '.mp4'

    downloadVideo(fileName)
    convert_video_to_audio(
        f'files/{fileName}', f"files/{fileName.replace('.mp4', '.mp3')}")
    transcript = transcribe(f"files/{fileName.replace('.mp4', '.mp3')}")
    text = generate_srt(transcription=transcript)
    segments = segments_from_transcription(text, segmentLength)
    print(segments)

    return Response("Generated!", status=status.HTTP_200_OK)
