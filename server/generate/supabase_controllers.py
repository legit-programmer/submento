import supabase
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

def downloadVideo(filename:str):
    with open('files/' + filename + '.mp4', 'wb+') as f:
        res = supabase.storage.from_('videos').download(f"{filename}.mp4")
        f.write(res)

