import os
import datetime
from app.models import chat
from flask_socketio import SocketIO, emit
from .models import db, Message

# create your SocketIO instance
socketio = SocketIO()


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://my-neighborkhood.herokuapp.com",
        "https://my-neighborkhood.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    new_message = Message(
        user_id=data['user_id'],
        chat_id=data['chat_id'],
        body=data['body'],
        created_at=data['created_at'],
        updated_at=data['updated_at']
    )

    db.session.add(new_message)
    db.session.commit()
    messages = Message.query.filter(Message.user_id == data['user_id'], Message.body == data['body']).all()
    ourMsg = messages[len(messages) - 1]
    data['id'] = ourMsg.id
    emit(data["chat_id"], data, broadcast=True)
