import sys
sys.path.append("..")

from util.PromptChatGPT import prompt_chat_gpt
from FirestoreDB import get_user_message_history, add_user_message_history
from util.QueryFiass import query_textbook


def ask_chatbot(request):
    body = request.get_json()
    email = body['email']
    message_history = body['message_history']
    student_question = body['student_question']
    course_name = body['course_name']

    # lecture_text = query_faiss("lecture_index.faiss", student_question)
    textbook_text, page_numbers = query_textbook(student_question)
    lecture_text = "This is a lecture excerpt"
    # textbook_text = "This is a textbook passage"
    new_message_history = prompt_chat_gpt(student_question, lecture_text, textbook_text, message_history, course_name)
    # replace last user message with only student question, so that the textbook and lecture excerpts are not displayed in the chat
    new_message_history[-2] = {"role": "user", "content": student_question}
    # Add page numbers to the assistant response
    new_message_history[-1]["content"] += "\n See textbook pages: " + ", ".join(str(num) for num in page_numbers)
    add_user_message_history(email, course_name, new_message_history)

    # print(new_message_history)
    return new_message_history

