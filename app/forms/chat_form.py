from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Channel


def channel_name_exists(form, field):
    print("Checking if channel_name exists", field.data)
    name = field.data
    # Might need to iterate inside a list of Multi-person DM
    channel_name = Channel.query.filter(Channel.name == name).first()
    if channel_name:
        raise ValidationError("Channel name already exists.")


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=25, message="Name must be between 1-25 characters."), channel_name_exists])
    channel_type = StringField('channel_type', validators=[DataRequired()])
