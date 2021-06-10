from random import randint
from app.models import db, Chat, User


def seed_chats():
    for i in range(7):
        chat = Chat(
            name = f"chat-{i}"
        )
        db.session.add(chat)
        db.session.commit()

    allusers = User.query.all()
    allusers = allusers[0:8]
    allchats = Chat.query.all()



    allchats[0].users.append(allusers[0])
    allchats[0].users.append(allusers[1])
    allchats[1].users.append(allusers[0])
    allchats[1].users.append(allusers[2])
    allchats[2].users.append(allusers[0])
    allchats[2].users.append(allusers[3])
    allchats[3].users.append(allusers[0])
    allchats[3].users.append(allusers[4])
    allchats[4].users.append(allusers[0])
    allchats[4].users.append(allusers[5])
    allchats[5].users.append(allusers[0])
    allchats[5].users.append(allusers[6])
    allchats[6].users.append(allusers[0])
    allchats[6].users.append(allusers[7])

    db.session.commit()


def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
