from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, DateField, DecimalField, BooleanField
from wtforms.validators import DataRequired,  Optional
from flask_wtf.file import FileField, FileAllowed
from datetime import datetime

class AddEmployeeForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired()])
    surname = StringField('Фамилия', validators=[DataRequired()])
    patronymic = StringField('Отчество', validators=[DataRequired()])
    vacancy = StringField('Вакансия', validators=[DataRequired()])
    photo = FileField('Фото', validators=[FileAllowed(['jpg', 'png', 'jpeg'], 'Только изображения!')])
    submit = SubmitField('Добавить')


class EditEmployeeForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired()])
    surname = StringField('Фамилия', validators=[DataRequired()])
    patronymic = StringField('Отчество', validators=[DataRequired()])
    vacancy = StringField('Вакансия', validators=[DataRequired()])
    photo = FileField('Фото', validators=[FileAllowed(['jpg', 'png', 'jpeg'], 'Только изображения!')])
    submit = SubmitField('Сохранить')


class AddNewsForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Содержание', validators=[DataRequired()])
    date = DateField('Дата', default=datetime.today, validators=[DataRequired()])
    submit = SubmitField('Добавить')


class EditNewsForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Содержание', validators=[DataRequired()])
    date = DateField('Дата', default=datetime.today, validators=[DataRequired()])
    submit = SubmitField('Сохранить изменения')



class AddVacancyForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Описание', validators=[DataRequired()])
    salary = DecimalField('Зарплата', validators=[Optional()])
    status = BooleanField('Статус', default=True)
    date = DateField('Дата', default=datetime.today, validators=[DataRequired()])
    submit = SubmitField('Добавить')


class EditVacancyForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Описание', validators=[DataRequired()])
    salary = DecimalField('Зарплата', validators=[Optional()])
    status = BooleanField('Статус')
    date = DateField('Дата', default=datetime.today, validators=[DataRequired()])
    submit = SubmitField('Сохранить изменения')