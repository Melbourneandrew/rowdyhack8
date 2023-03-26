# TODO: Move similarity search to GCP Vertex AI
from dotenv import load_dotenv
import os
import json
import uuid
load_dotenv()
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION")
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
PROJECT_NUMBER = os.getenv("GOOGLE_CLOUD_PROJECT_NUMBER")
INDEX_ENDPOINT_ID = os.getenv("GOOGLE_CLOUD_INDEX_ENDPOINT_ID")
NETWORK_NAME = "default"
VPC_NETWORK_NAME = f"projects/{PROJECT_NUMBER}/global/networks/{NETWORK_NAME}"
def deploy_vertex_index(index):
    url = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/indexEndpoints/{INDEX_ENDPOINT_ID}:deployIndex"
    deployed_index_id = str(uuid.uuid4())
    # not sure what this is
    index = "test_index_id"
    display_name = "test_index_name"
    body = json.dumps({
        "deployedIndex":{
            "id": deployed_index_id,
            "index": f"projects/{PROJECT_ID}/locations/{LOCATION}/indexes/{index}",
            "displayName": display_name
        }})