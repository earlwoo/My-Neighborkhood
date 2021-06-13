from flask import Blueprint, jsonify, request
from app.models import Chat, User, db
from flask_login import current_user, login_user

chat_routes = Blueprint('chats', __name__)

def chat_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:  # form.errors []
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages


@chat_routes.route('/')  # GET /api/chats/
def get_chats():
    """
    Gets all the chats
    """
    return {chat.id: chat.to_dict() for chat in current_user.chats}


# POST a new Chat
@chat_routes.route('/', methods=['POST'])  # POST /api/chats/
def post_chat():
    """
    Creates a new chat (public or private or dm)
    """
    chat_name = request.get_json()['chat']['name']
    selected_id = request.get_json()['chat']['selected_id']

    chat = Chat(
        name = chat_name
    )

    db.session.add(chat)
    db.session.commit()

    selected_user = User.query.get(selected_id)
    current_user.chats.append(chat)
    selected_user.chats.append(chat)
    db.session.commit()

    return chat.to_dict()
