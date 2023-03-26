import sys

from api.util.index import *


for file in sys.argv[1]:
    print(file)
    id = unique_id()
    fname = f"{id}.flac"
    blob = file_to_gcs(open(file, 'rb'), fname, "audio/mp3")

    gcs = f"gs://{AUDIO_BUCKET_NAME}/{fname}"
    print("lol",gcs)

    t = transcribe_gcs(gcs, speech_v1.RecognitionConfig.AudioEncoding.MP3, id)
    print(t, t.metadata, t)