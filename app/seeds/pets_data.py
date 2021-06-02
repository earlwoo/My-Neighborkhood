from app.models import db, Pet

def seed_pets():

    pet1 = Pet(
        owner_id=1,
        name="Loco",
        image="https://slackx.s3.amazonaws.com/kimi.png",
        bio="Happy Tester Dog",
        age=6
    )

    pet2 = Pet(
        owner_id=2,
        name="Nate",
        image="https://slackx.s3.amazonaws.com/nathaniel.jpg",
        bio="The Real Nate Dog",
        age=2
    )

    db.session.add(pet1)
    db.session.add(pet2)
    db.session.commit()



def undo_pets():
    db.session.execute('TRUNCATE pets RESTART IDENTITY CASCADE;')
    db.session.commit()
