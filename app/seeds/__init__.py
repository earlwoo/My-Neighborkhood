from flask.cli import AppGroup
from .users_data import seed_users, undo_users
from .pets_data import seed_pets, undo_pets
from .chats_data import seed_chats, undo_chats
from .messages_data import seed_messages, undo_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_pets()
    seed_chats()
    seed_messages()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pets()
    undo_chats()
    undo_messages()
    # Add other undo functions here
