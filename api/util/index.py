print("Utilities");

from io import BufferedReader
from google.cloud import speech_v1p1beta1 as speech_v1
from google.cloud import storage
import uuid

# TODO: Move constants to env fila
AUDIO_BUCKET_NAME = "rh23-audio-files"
RESULT_BUCKET_NAME = "rh23-result-files"

def unique_id():
    return str(uuid.uuid4())

storage_client = storage.Client()
speech_client = speech_v1.SpeechClient()

def file_to_gcs(file: BufferedReader, filename: str, content_type: str):
    """Uploads a file to the bucket."""

    bucket = storage_client.get_bucket(AUDIO_BUCKET_NAME)
    blob = bucket.blob(filename)
    blob.upload_from_string(
        file.read(),
        content_type=content_type,
    )

    return blob

def transcribe_gcs(gcs_uri: str, encoding: speech_v1.RecognitionConfig.AudioEncoding, id: str):
    """Asynchronously transcribes the audio file specified by the gcs_uri."""

    output_config = speech_v1.TranscriptOutputConfig(gcs_uri=f"gs://{RESULT_BUCKET_NAME}/{id}.json")
    audio = speech_v1.RecognitionAudio(uri=gcs_uri)
    config = speech_v1.RecognitionConfig(
        encoding=encoding,
        audio_channel_count=2,
        language_code="en-US",
    )
    request = speech_v1.LongRunningRecognizeRequest(config=config, audio=audio, output_config=output_config)

    operation = speech_client.long_running_recognize(request)
    return operation