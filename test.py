from api.util.index import *

file = "/users/json/desktop/Interview Recordings/short.flac"
id = unique_id()
fname = f"{id}.flac"
blob = file_to_gcs(open(file, 'rb'), fname, "audio/flac")

gcs = f"gs://{AUDIO_BUCKET_NAME}/{fname}"
print("lol",gcs)

t = transcribe_gcs(gcs, speech_v1.RecognitionConfig.AudioEncoding.FLAC, id)
print(t)