from random import randint
from app.models import db, User, Chat



def seed_user_chats():

    users = User.query.all()

    # demo = users[0]
    # demo1 = users[1]

    chats = Chat.query.all()

    for user in users:
        user.chats.append(chats[0])
        db.session.commit()


def undo_user_chats():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
