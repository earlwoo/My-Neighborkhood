from app.models import db, Message
from random import randint
from faker import Faker
fake = Faker()

def seed_messages():

    for i in range(7):
        for j in range(3):
            myMsg = Message(
                user_id = 1,
                chat_id = i+1,
                body = fake.paragraph(nb_sentences=randint(1,3))
            )
            otherMsg = Message(
                user_id = i+2,
                chat_id = i+1,
                body = fake.paragraph(nb_sentences=randint(1,3))
            )
            db.session.add(myMsg)
            db.session.add(otherMsg)
            db.session.commit()

    # for i in range (15):
    #     msg = Message(
    #         user_id=randint(1, 15),
    #         chat_id=1,
    #         body = fake.paragraph(nb_sentences=randint(1,3))
    #     )
    #     db.session.add(msg)
    #     db.session.commit()

    # new_message = Message(
    #     user_id = 1,
    #     chat_id = 1,
    #     body = "test message1"
    # )
    # new_message2 = Message(
    #     user_id = 2,
    #     chat_id = 1,
    #     body = "test message2"
    # )

    # db.session.add(new_message)
    # db.session.add(new_message2)
    # db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
