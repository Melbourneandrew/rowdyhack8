from flask import Flask, request
import FirestoreDB
from controllers.ChatbotController import ask_chatbot
from controllers.TwilioChatbotController import twilio_ask_chatbot
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
FirestoreDB.connect()

@app.route('/')
def hello_world():
    return 'Lets get rowdy!'

@app.route('/get_history', methods=['GET'])
def get_history():
    email = request.args.get('email')
    course = request.args.get('course')
    message_history = FirestoreDB.get_user_message_history(email, course)
    return message_history

@app.route('/clear_history', methods=['GET'])
def clear_history():
    email = request.args.get('email')
    course = request.args.get('course')
    FirestoreDB.clear_user_message_history(email, course)
    return "History cleared"

@app.route('/ask_question', methods=['POST'])
def ask_question():
    print("Question asked...")
    return ask_chatbot(request)

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    print("SMS received...")
    return twilio_ask_chatbot(request)
