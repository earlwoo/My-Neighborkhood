import datetime
from .db import db

class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable = False)
    image = db.Column(db.String(360))
    bio = db.Column(db.Text, nullable = False, default="Please Fill Me Out")
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable = False, default=datetime.datetime.now())

    owner = db.relationship("User", back_populates="pet")

    def to_dict(self):
        return {
        "id": self.id,
        "owner_id": self.owner_id,
        "name": self.name,
        "image": self.image,
        "bio": self.bio,
        "age": self.age,
        }
