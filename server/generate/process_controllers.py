import subprocess
import g4f
import whisper
from whisper import utils
import os


def convert_video_to_audio(video_file_path, audio_file_path):
    command = f"ffmpeg -i {video_file_path} -vn -ar 48000 -ac 2 -b:a 256k {audio_file_path}"
    subprocess.call(command, shell=True)

def transcribe(audio_path:str):
    """Transcibes audio with timestamps"""

    model = whisper.load_model("base")
    path = os.path.join(os.getcwd(), audio_path) 
    result = model.transcribe(audio=path, verbose=False)
    
    return result["segments"]

def segments_from_transcription(verbose_transcription: str, segment_length:str):
    
    g4f.debug.logging = True  
    g4f.debug.check_version = False  
    command = """
    below is a verbose transcription of a video,
    you need to divide it into segments just like in youtube , length of each :,""" + segment_length +""" 
    and the starting time and ending time of the same,
    all in json format,
    with the appropriate title of the segment ,

    this means that you directly start generating the json file withou code markdown
    plain text json: the format should be {"segments":[
    {
      "title": "",
      "length": "",
      "start_time": "",
      "end_time": ""
    }
    ]}:\n
    """
    response = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4,
        messages=[{"role": "user", "content": command + verbose_transcription}])
    temp = response.rfind('}')
    response = response[response.find('{'):temp+1]
    return response

def generate_srt(transcription:str, user_id:str):
    s = ""
    for i in transcription:
        start, end, text = i["start"], i["end"], i["text"]
        s+=f"[{utils.format_timestamp(start)} --> {utils.format_timestamp(end)}] {text}"

    l = s.split('[')
    with open(f'files/{user_id}.srt', 'w') as f:
        for i in l[1:]:
            line = i.split(']')
            time = line[0]
            time = time.split(' --> ')
            time = ["00:" + j.replace('.', ',') for j in time]
            time = " --> ".join(time)
            print(str(l.index(i)) + "\n" + time + "\n" + line[1].strip() + "\n\n")
            f.writelines(str(l.index(i)) + "\n" + time + "\n" + line[1].strip() + "\n\n")
    return s