from werkzeug.security import generate_password_hash
from app.models import db, User
import json

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        firstname='Demo',
        lastname='User',
        bio='happy to be here testing',
        email='demo@aa.io',
        password='password',
        address=json.dumps({'street': '2019 S. Bouvier St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        avatar='https://slackx.s3.amazonaws.com/kimi.png'
    )

    demo2 = User(
        firstname='Demo',
        lastname='User2',
        bio="i'm with the testing crew",
        email='demo2@aa.io',
        password='password',
        address=json.dumps({'street': '2020 S. Bouvier St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        avatar='https://slackx.s3.amazonaws.com/earl.png'
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
