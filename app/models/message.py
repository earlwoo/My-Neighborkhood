import datetime
from .db import db

class Message(db.Model):
    __tablename__ =  'messages'

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())

    user = db.relationship("User", back_populates="messages")
    chat = db.relationship("Chat", back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chat_id": self.chat_id,
            "body": self.body,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
