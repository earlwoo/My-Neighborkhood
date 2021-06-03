from flask import Blueprint
from app.models import User
from flask_login import current_user

users_routes = Blueprint('all_users', __name__)


@users_routes.route('/')
def get_users():
    users = User.query.all()
    users_dict = [user.to_dict() for user in users]

    curr_user = current_user.to_dict()

    local_users = [user for user in users_dict if user['address']['zip'] == curr_user['address']['zip']]
    local_users = { user['id']: user for user in local_users }

    return local_users
