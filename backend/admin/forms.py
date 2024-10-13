from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField, FieldList, FormField, HiddenField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed


class AddNewsForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Содержание', validators=[DataRequired()])
    # Категории с выбором значений
    category = SelectField('Категория', choices=[('Новости института', 'Новости института'), ('Новости арматурного сообщества', 'Новости арматурного сообщества'), ('Новости рынка', 'Новости рынка')], validators=[DataRequired()])
    submit = SubmitField('Добавить новость')

class EditNewsForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField('Содержание', validators=[DataRequired()])
    # Категории с выбором значений
    category = SelectField('Категория', choices=[('Новости института', 'Новости института'), ('Новости арматурного сообщества', 'Новости арматурного сообщества'), ('Новости рынка', 'Новости рынка')], validators=[DataRequired()])
    submit = SubmitField('Добавить новость')

class AddProjectForm(FlaskForm):
    name = StringField('Название', validators=[DataRequired()])
    content = TextAreaField('Описание', validators=[DataRequired()])
    submit = SubmitField('Добавить проект')

class EditProjectForm(FlaskForm):
    name = StringField('Название', validators=[DataRequired()])
    content = TextAreaField('Описание', validators=[DataRequired()])
    submit = SubmitField('Сохранить изменения')




class AddDocumentForm(FlaskForm):
    type = StringField('Тип документа', validators=[DataRequired()])
    name = StringField('Название', validators=[DataRequired()])
    file = FileField('Загрузить файл (PDF, DOCX, JPG или PNG)', validators=[DataRequired(), FileAllowed(['pdf', 'docx', 'jpg', 'jpeg', 'png'], 'Только PDF, DOCX, JPG и PNG!')])
    submit = SubmitField('Добавить документ')

class EditDocumentForm(FlaskForm):
    type = StringField('Тип документа', validators=[DataRequired()])
    name = StringField('Название', validators=[DataRequired()])
    file = FileField('Обновить файл (PDF, DOCX, JPG или PNG)', validators=[FileAllowed(['pdf', 'docx', 'jpg', 'jpeg', 'png'], 'Только PDF, DOCX, JPG и PNG!')])
    submit = SubmitField('Сохранить изменения')



class EditMainContentForm(FlaskForm):
    title = StringField('Заголовок', validators=[DataRequired()])
    mission_title = StringField('Миссия - заголовок', validators=[DataRequired()])
    mission_description1 = TextAreaField('Миссия - Описание 1', validators=[DataRequired()])
    mission_description2 = TextAreaField('Миссия - Описание 2', validators=[DataRequired()])
    submit = SubmitField('Сохранить')





