import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_chat import user_chats
import json


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False, unique=True)
    location = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(360))
    bio = db.Column(db.Text, nullable=False, default="Please Fill This Out")
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    messages = db.relationship("Message", back_populates="user")

    pet = db.relationship(
        "Pet", uselist=False,
        back_populates="owner"
    )

    chats = db.relationship(
        'Chat',
        secondary=user_chats,
        back_populates='users'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "avatar": self.avatar,
            "address": json.loads(self.address),
            "location": json.loads(self.location),
            "bio": self.bio,
            "pet": self.pet.to_dict(),
            "chats": {chat.id: chat.to_dict() for chat in self.chats}
        }
