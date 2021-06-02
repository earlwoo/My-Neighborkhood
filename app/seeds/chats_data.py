from random import randint
from app.models import db, Chat


def seed_chats():
    new_chat = Chat(
        name="test chat 1"
    )
    new_chat2 = Chat(
        name="test chat 2"
    )

    db.session.add(new_chat)
    db.session.add(new_chat2)
    db.session.commit()


def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
