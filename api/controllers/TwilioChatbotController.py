import sys
sys.path.append("..")

from util.PromptChatGPT import prompt_chat_gpt
from util.QueryFiass import query_textbook
from twilio.twiml.messaging_response import MessagingResponse

def twilio_ask_chatbot(request):
    student_question = request.form['Body']
    email = "melby_mobile@gmail.com"
    course_name = "Marketing101"
    print("Student question: " + student_question)

    # lecture_text = query_faiss("lecture_index.faiss", student_question)
    textbook_text, page_numbers = query_textbook(student_question)
    lecture_text = "This is a lecture excerpt"
    new_message_history = prompt_chat_gpt(student_question, lecture_text, textbook_text, [], course_name)
    new_message_history[-1]["content"] += "\n See textbook pages: " + ", ".join(str(num) for num in page_numbers)

    resp = MessagingResponse()
    resp.message(new_message_history[-1]["content"])

    return str(resp)

