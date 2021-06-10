from werkzeug.security import generate_password_hash
from app.models import db, User
from random import randint
from faker import Faker
import json
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    seed_pic = [
        'https://randomuser.me/api/portraits/women/25.jpg',
        'https://randomuser.me/api/portraits/men/27.jpg',
        'https://randomuser.me/api/portraits/men/30.jpg',
        'https://randomuser.me/api/portraits/men/33.jpg',
        'https://randomuser.me/api/portraits/men/36.jpg',
        'https://randomuser.me/api/portraits/women/37.jpg',
        'https://randomuser.me/api/portraits/men/85.jpg',
        'https://randomuser.me/api/portraits/women/92.jpg',
        'https://randomuser.me/api/portraits/women/18.jpg',
        'https://randomuser.me/api/portraits/men/5.jpg',
        'https://randomuser.me/api/portraits/men/31.jpg',
        'https://randomuser.me/api/portraits/men/30.jpg',
        'https://randomuser.me/api/portraits/women/70.jpg',
        'https://randomuser.me/api/portraits/women/19.jpg',
        'https://randomuser.me/api/portraits/men/78.jpg'
    ]

    demo1 = User(
        firstname='Demo',
        lastname='User',
        bio='happy to be here testing',
        email='demo@aa.io',
        password='password',
        address=json.dumps({'street': '2019 S. Bouvier St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.925900, 'lng': -75.175240}),
        avatar='https://slackx.s3.amazonaws.com/kimi.png'
    )
    demo2 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1922 Lambert St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.927720, 'lng': -75.180290}),
        avatar=seed_pic[0]
    )
    demo3 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '2239 Moore St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.929891, 'lng': -75.182606}),
        avatar=seed_pic[1]
    )
    demo4 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1811 McKean St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.926620, 'lng': -75.176170}),
        avatar=seed_pic[2]
    )
    demo5 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1732 Wolf St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.922581, 'lng': -75.176281}),
        avatar=seed_pic[3]
    )
    demo6 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1532 McKean St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.925844, 'lng': -75.171958}),
        avatar=seed_pic[4]
    )
    demo7 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '2031 S Bancroft St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.925652, 'lng': -75.173234}),
        avatar=seed_pic[5]
    )
    demo8 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '17116 Snyder Ave','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.925196, 'lng': -75.176093}),
        avatar=seed_pic[6]
    )
    demo9 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '2122 Dorrance St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.928394, 'lng': -75.177304}),
        avatar=seed_pic[7]
    )
    demo10 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '2044 S Garnet St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.926144, 'lng': -75.178177}),
        avatar=seed_pic[8]
    )
    demo11 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1822 Dudley St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.926830, 'lng': -75.176197}),
        avatar=seed_pic[9]
    )
    demo12 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1711 Sigel St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.927991, 'lng':  -75.174175}),
        avatar=seed_pic[10]
    )
    demo13 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1946 S Chadwick St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.926795, 'lng': -75.173659}),
        avatar=seed_pic[11]
    )
    demo14 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1713 McKean St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.926344, 'lng': -75.174638}),
        avatar=seed_pic[12]
    )
    demo15 = User(
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        email=fake.email(),
        password='password',
        address=json.dumps({'street': '1700 Jackson St.','zip': '19145','city': 'Philadelphia', 'state': 'PA'}),
        location=json.dumps({'lat': 39.923696, 'lng': -75.174964}),
        avatar=seed_pic[13]
    )

    usersArr = [demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8, demo9, demo10, demo11, demo12, demo13, demo14, demo15]

    for user in usersArr:
        db.session.add(user)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
