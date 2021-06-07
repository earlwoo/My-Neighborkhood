import datetime
from .db import db
from .user_chat import user_chats


class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    messages = db.relationship("Message", back_populates="chat")

    users = db.relationship(
        'User',
        secondary=user_chats,
        back_populates='chats'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "messages": {message.id: message.to_dict() for message in self.messages},
            "users": {user.id: {"name": f"{user.firstname} {user.lastname}", "avatar": user.avatar, "id": user.id} for user in self.users}
        }
