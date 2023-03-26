import requests
import json
from dotenv import load_dotenv
import os
load_dotenv()
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION")
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
PROJECT_NUMBER = os.getenv("GOOGLE_CLOUD_PROJECT_NUMBER")
NETWORK_NAME = "default"
VPC_NETWORK_NAME = f"projects/{PROJECT_NUMBER}/global/networks/{NETWORK_NAME}"
def create_vertex_endpoint(name):

    url = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/indexEndpoints"
    body = json.dumps({
        "display_name": name,
        "network": VPC_NETWORK_NAME})
    headers = {
        "Authorization": f"Bearer {os.getenv('GOOGLE_CLOUD_TOKEN')}",
        "Content-Type": "application/json; charset=utf-8"}
    response = requests.post(url, data=body, headers=headers)
    print(response.text)

if __name__ == "__main__":
    create_vertex_endpoint("test_endpoint")