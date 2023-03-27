import sys

sys.path.append("..")

from util.PromptChatGPT import prompt_chat_gpt
from FirestoreDB import get_user_message_history, add_user_message_history
from util.QueryFiass import query_textbook
failure_messages = ["fail.", "\"fail\".", "(fail).", "incorrect.", "(incorrect).", "Failure.", "failure.", "Failure", "failure", "Incorrect.", "incorrect.", "Incorrect", "incorrect", "Fail.", "fail.", "Fail", "fail", "Failure.", "failure.", "Failure", "failure", "Incorrect.", "incorrect.", "Incorrect", "incorrect", "Fail.", "fail.", "Fail", "fail"]
multiple_choice_matches = [" A)", " B)", " C)", " D)", " a)", " b)", " c)", " d)", " a.", " b.", " c.", " d.", " A.", " B.", " C.", " D.", "\nA)", "\nB)", "\nC)", "\nD)", "\na)", "\nb)", "\nc)", "\nd)", "\na.", "\nb.", "\nc.", "\nd.", "\nA.", "\nB.", "\nC.", "\nD."]
def ask_chatbot(request):
    body = request.get_json()
    email = body['email']
    message_history = body['message_history']
    student_question = body['student_question']
    # Include a prompt to pick a b c or d if the question is multiple choice
    for string in multiple_choice_matches:
        if string in student_question:
            print("Multiple choice question detected")
            student_question = student_question + " select one of the multiple choice options. A) B) C) D)"
            break;
    course_name = body['course_name']
    print("Student question: " + student_question)

    # lecture_text = query_faiss("lecture_index.faiss", student_question)
    textbook_pages, page_numbers = query_textbook(student_question)
    textbook_text = textbook_pages[0] + " " + textbook_pages[1]
    textbook_text = textbook_text[:3000]
    lecture_text = "This is a lecture excerpt"

    new_message_history = prompt_chat_gpt(student_question, lecture_text, textbook_text, page_numbers, message_history,
                                          course_name)
    # Check that the last message is not a failure
    last_msg = new_message_history[-1]["content"].split()[-1]
    print("Last message: " + last_msg)
    if last_msg in failure_messages:
        print("Chatbot failed to answer question, prompting again")
        # Remove the last messages from the message history
        message_history = message_history[:-1]
        message_history = message_history[:-1]
        # Get more text from the textbook
        more_textbook_text = textbook_pages[2] + " " + textbook_pages[3]
        more_textbook_text = more_textbook_text[:3000]
        # Re-prompt the chatbot
        new_message_history = prompt_chat_gpt(student_question, lecture_text, more_textbook_text, page_numbers,
                                              message_history, course_name)

    # replace last user message with only student question, so that the textbook and lecture excerpts are not displayed in the chat
    new_message_history[-2] = {"role": "user", "content": student_question}
    # Add page numbers to the assistant response
    new_message_history[-1]["content"] += "\n See textbook pages: " + ", ".join(str(num) for num in page_numbers)
    # add_user_message_history(email, course_name, new_message_history)

    # print(new_message_history)
    return new_message_history
