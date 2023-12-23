import subprocess

def convert_video_to_audio(video_file_path, audio_file_path):
    command = f"ffmpeg -i {video_file_path} -vn -ar 48000 -ac 2 -b:a 256k {audio_file_path}"
    subprocess.call(command, shell=True)

