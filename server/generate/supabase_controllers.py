import supabase
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(url, key)

def downloadVideo(filename:str):
    filelist = supabase.storage.from_('videos').list()
    currentFileList = []
    with open('files/' + filename + '.mp4', 'wb+') as f:
        offset = 0
        for file in filelist:
            if filename in file['name']:
                
                res = supabase.storage.from_('videos').download(f"{offset}-{filename}.mp4")
                f.write(res)
                currentFileList.append(file['name'])
                offset+=49000000
    supabase.storage.from_('videos').remove(currentFileList)
