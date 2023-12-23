import g4f

g4f.debug.logging = True  # Enable debug logging
g4f.debug.check_version = False  # Disable automatic version checking

command = """
below is a verbose transcription of a video,
you need to divide it into segments, length of each :{},
with the name of the segment,
and the starting time and ending time of the same,
all in json format without any extra greetings or text,
this means that you directly start generating the json file withou code markdown
plain text json:\n
"""


def segments_from_transcription(verbose_transcription: str, segment_length:str):
    response = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4_turbo,
        messages=[{"role": "user", "content": command.format(segment_length) + verbose_transcription}],
        stream=True)
    for message in response:
        print(message, flush=True, end='')
    

