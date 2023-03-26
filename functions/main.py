import functions_framework

# Register a CloudEvent function with the Functions Framework
@functions_framework.cloud_event
def new_result_file(cloud_event):
    print("Received event with ID: {}".format(cloud_event["id"]))
    # delete the audio file
    # TODO: Generate the embeddings, put them somewhere
    print(cloud_event)