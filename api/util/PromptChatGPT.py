from dotenv import load_dotenv
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
def prompt_chat_gpt(student_question, lecture_text, textbook_text, message_history=None,
                    course_name=None):
    if message_history is None:
        message_history = []

    student_prompt = "Lecture excerpt: " + lecture_text + " textbook passage: " + textbook_text + " Student question: " + student_question
    # If message history is empty, start a new chat
    if len(message_history) == 0:
        message_history.append({
            "role": "system",
            "content": "You are a college professor teaching " + course_name + ". When a student brings you a question, you will be provided with a excerpt from your lecture and a textbook passage related to the question to help you answer their query with context."
        })
    message_history.append({
        "role": "user", "content": student_prompt
    })
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=message_history,
        )
        print("3.5-turbo completion received")
        message = response["choices"][0]["message"]
        message_history.append(message)
        return message_history
    except Exception as e:
        print("Error in prompt_chat_gpt")
        print(e)
        return message_history
