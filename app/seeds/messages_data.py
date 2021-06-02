from app.models import db, Message

def seed_messages():
    new_message = Message(
        user_id = 1,
        chat_id = 1,
        body = "test message1"
    )
    new_message2 = Message(
        user_id = 2,
        chat_id = 1,
        body = "test message2"
    )

    db.session.add(new_message)
    db.session.add(new_message2)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
