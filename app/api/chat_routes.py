from flask import Blueprint, jsonify, request
from app.models import Chat, User, db
from app.forms import ChatForm
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


@channel_routes.route('/')  # GET /api/chats/
def get_chats():
    """
    Gets all the chats
    """
    return {chat.id: chat.to_dict() for chat in current_user.chats}


# POST a new Channel
@channel_routes.route('/', methods=['POST'])  # POST /api/channels/
def post_chat():
    """
    Creates a new channel (public or private or dm)
    """
    form = ChatForm()
    print("FORM ERRORS", form.errors)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): # if form is validated, store to DB
        chat = Chat(
            name = form.data['name'],
            channel_type = form.data['channel_type']
        )
        current_user.chat.append(chat)

        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return {'errors': chat_errors_to_error_messages(form.errors)}, 400
