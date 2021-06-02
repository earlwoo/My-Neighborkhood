import datetime
from .db import db

user_chats = db.Table(
    "user_chats",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "chat_id", db.Integer, db.ForeignKey("chats.id"), primary_key=True
    ),
    db.Column(
        'created_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    ),
    db.Column(
        'updated_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    )
)
