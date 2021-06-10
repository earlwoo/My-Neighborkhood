from app.models import db, Pet
from random import randint
from faker import Faker
fake = Faker()

dog_pics = [
  'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_1596.jpg',
  'https://images.dog.ceo/breeds/cairn/n02096177_2788.jpg',
  'https://images.dog.ceo/breeds/spaniel-japanese/n02085782_2074.jpg',
  'https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg',
  'https://images.dog.ceo/breeds/samoyed/n02111889_3494.jpg',
  'https://images.dog.ceo/breeds/buhund-norwegian/hakon1.jpg',
  'https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_1724.jpg',
  'https://images.dog.ceo/breeds/appenzeller/n02107908_5402.jpg',
  'https://images.dog.ceo/breeds/brabancon/n02112706_37.jpg',
  'https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_4776.jpg',
  'https://images.dog.ceo/breeds/chihuahua/n02085620_5713.jpg',
  'https://images.dog.ceo/breeds/rottweiler/n02106550_1889.jpg',
  'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_1832.jpg',
  'https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_3007.jpg'
]

def seed_pets():

    # pet1 = Pet(
    #     owner_id=1,
    #     name="Loco",
    #     image="https://slackx.s3.amazonaws.com/kimi.png",
    #     bio="Happy Tester Dog",
    #     age=6
    # )

    # pet2 = Pet(
    #     owner_id=2,
    #     name="Nate",
    #     image="https://slackx.s3.amazonaws.com/nathaniel.jpg",
    #     bio="The Real Nate Dog",
    #     age=2
    # )

    for i in range(len(dog_pics)):
        pet = Pet(
            owner_id=i+1,
            name=fake.first_name(),
            image=dog_pics[i],
            bio=fake.paragraph(nb_sentences=randint(1,3)),
            age=randint(1, 25)
        )
        db.session.add(pet)
        db.session.commit()




def undo_pets():
    db.session.execute('TRUNCATE pets RESTART IDENTITY CASCADE;')
    db.session.commit()
