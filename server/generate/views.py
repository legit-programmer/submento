import json
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .supabase_controllers import *
from .process_controllers import *
import os
import uuid

@api_view(['POST'])
def generate(request):
    [os.remove('files/'+i) for i in os.listdir('files')]
    
    data = dict(request.data)

    segmentLength: str = data.get('segment_length')
    user_id: str = data.get('user_id')
    fileName: str = user_id + '.mp4'
    actualFilename: str = data.get('filename')

    uniqueId = uuid.uuid4().__str__()
    
    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Fetching Video")
    downloadVideo(fileName)

    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Converting")
    convert_video_to_audio(
        f'files/{fileName}', f"files/{fileName.replace('.mp4', '.mp3')}")
    
    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Transcribing")
    transcript = transcribe(f"files/{fileName.replace('.mp4', '.mp3')}")

    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Generating subtitles")
    text = generate_srt(transcription=transcript, user_id=user_id)
    segmentsLength = f"length of each :,{segmentLength} minutes" if segmentLength != "null" else ""
    
    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Generating segments")
    segments = segments_from_transcription(text, segmentsLength)

    if ("</script>") in segments:
        return Response("Error while generating segments for your video, please try again...", status.HTTP_500_INTERNAL_SERVER_ERROR)    

    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=True, status="Uploading user data")
    uploadedFileName = uploadSrt(user_id, f'files/{user_id}.srt')

    updateUserData(user_id, actualFilename, uploadedFileName, segments)

    data = json.loads(segments.strip())
    data['uploaded_srt_file_name'] = uploadedFileName

    setGenerationState(uniqueid=uniqueId, user_id=user_id, is_generating=False)
    return Response(data, status=status.HTTP_200_OK)
