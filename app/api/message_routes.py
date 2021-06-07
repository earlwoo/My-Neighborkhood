from flask import Blueprint, jsonify, request
from app.models import db, Message
from flask_login import current_user

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:chat_id>')  # /api/messages/channel_id
def get_messages(chat_id):
    messages = Message.query.filter(Message.chat_id == chat_id).all()

    return {message.id: message.to_dict() for message in messages}


@message_routes.route('/<int:message_id>', methods=["PATCH"])  # /api/messages/message_id
def edit_message(message_id):

    message_id = request.get_json()['message_id']
    body = request.get_json()['body']
    updated_at = request.get_json()['updated_at']

    edit_message = Message.query.get(message_id)
    edit_message.body = body
    edit_message.updated_at = updated_at

    db.session.commit()
    return edit_message.to_dict()


@message_routes.route('/<int:message_id>', methods=['DELETE'])  # /api/messages/message_id
def delete_message(message_id):

    message_id = request.get_json()['message_id']
    deleted_msg = Message.query.get(message_id)

    db.session.delete(deleted_msg)
    db.session.commit()
    return deleted_msg.to_dict()
