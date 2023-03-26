import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("melbournedev-firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
def connect():
    return db

def get_user(email):
    return db.collection(u'users').where(u'email', u'==', email).limit(1).get()

def get_user_message_history(email, course):
    print("Getting user message history for " + email + " in " + course)
    chat_history = db.collection('chats').where("email", "==", email).where("course", "==", course).limit(1).get()
    chats = []
    for chat in chat_history:
        chats.append(chat.to_dict())
    return chats


def add_user_message_history(email, course, message_history):
    existing_history = db.collection('chats').where("email", "==", email).where("course", "==", course).limit(1).get()
    if len(existing_history) > 0:
        db.collection(u'chats').document(existing_history[0].id).update({
            u'message_history': message_history
        })
    else:
        db.collection(u'chats').add({
            u'email': email,
            u'course': course,
            u'message_history': message_history
        })

def clear_user_message_history(email, course):
    existing_history = db.collection('chats').where("email", "==", email).where("course", "==", course).limit(1).get()
    if len(existing_history) > 0:
        db.collection(u'chats').document(existing_history[0].id).delete()