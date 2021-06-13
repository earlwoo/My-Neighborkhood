from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Pet, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=["PATCH"])
def editUser(id):
    user = User.query.get(id)
    user.bio = request.get_json()['bio']

    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)

    return user.to_dict()




@user_routes.route('/pet', methods=['PATCH'])
@login_required
def editPet():

    user = User.query.get(request.get_json()['user_id'])
    user.pet.bio = request.get_json()['bio']
    db.session.commit()
    return user.to_dict()
