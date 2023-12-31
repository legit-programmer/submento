from colorama import Fore
import supabase
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(url, key)


def log(msg):
    print(Fore.YELLOW + '[SUBMENTO CORE] ' +
          Fore.LIGHTGREEN_EX + str(msg) + Fore.WHITE)


def downloadVideo(filename: str):
    
    filelist = supabase.storage.from_('videos').list()
    log(filelist)
    currentFileList = []
    with open('files/' + filename, 'wb+') as f:
        offset = 0
        for file in filelist:
            if filename in file['name']:
                log(f"{offset}-{filename}")
                res = supabase.storage.from_(
                    'videos').download(f"{offset}-{filename}")
                f.write(res)
                currentFileList.append(file['name'])
                offset += 49000000
    supabase.storage.from_('videos').remove(currentFileList)

def uploadSrt(user_id:str, file):
    filename = f"{len(supabase.storage.from_('videos').list(f'subtitles/{user_id}'))}.srt"
    supabase.storage.from_('videos').upload(f'subtitles/{user_id}/{filename}', file)
    return filename

def setGenerationState(user_id:str, is_generating:bool):
    if is_generating:
        supabase.from_('in_progress').insert({"user_id":user_id}).execute()
    else:
        supabase.from_('in_progress').delete().eq('user_id', user_id).execute()