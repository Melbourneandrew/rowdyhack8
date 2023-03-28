import json
import sys

def json_to_text(json):
    results = json["results"]
    f = open("lecture_transcript.txt", "a+")
    for result in results:
        f.write(result["alternatives"][0]["transcript"] + " ")

if __name__ == "__main__":
    filename = sys.argv[1]
    json = json.load(open(filename))
    json_to_text(json)