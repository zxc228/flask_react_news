from flask import Blueprint, render_template, request, redirect, url_for, flash
from backend.models import Post, Vacancy, Employee
from backend import db
from werkzeug.utils import secure_filename
from datetime import datetime
import os
from backend.admin.forms import AddEmployeeForm, EditEmployeeForm, AddNewsForm, EditNewsForm, AddVacancyForm, EditVacancyForm
from PIL import Image
import uuid


admin = Blueprint('admin', __name__)





@admin.route("/admin")
def admin_index():
    return render_template("admin/index.html")


@admin.route("/admin/news")
def admin_news():
    news_list = Post.query.all()
    return render_template("admin/news_list.html", news_list=news_list)


@admin.route("/admin/news/<int:id>")
def admin_view_news(id):
    news = Post.query.get_or_404(id)
    return render_template("admin/view_news.html", news=news)


@admin.route("/admin/news/add", methods=['GET', 'POST'])
def admin_add_news():
    form = AddNewsForm()
    
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        date = form.date.data
        
        new_news = Post(title=title, content=content, date=date)
        db.session.add(new_news)
        db.session.commit()
        flash("Новость добавлена успешно!", 'success')
        return redirect(url_for('admin.admin_news'))
    
    return render_template("admin/add_news.html", form=form)

# Изменить новость
@admin.route("/admin/news/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_news(id):
    news = Post.query.get_or_404(id)
    form = EditNewsForm(obj=news)

    if form.validate_on_submit():
        news.title = form.title.data
        news.content = form.content.data
        news.date = form.date.data
        
        db.session.commit()
        flash("Новость обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_news'))

    return render_template("admin/edit_news.html", form=form, news=news)

# Удалить новость
@admin.route("/admin/news/delete/<int:id>", methods=['POST'])
def admin_delete_news(id):
    news = Post.query.get_or_404(id)
    db.session.delete(news)
    db.session.commit()
    flash("Новость удалена успешно!", 'success')
    return redirect(url_for('admin.admin_news'))

# Посмотреть все вакансии
@admin.route("/admin/vacancies")
def admin_vacancies():
    vacancy_list = Vacancy.query.all()
    return render_template("admin/vacancy_list.html", vacancy_list=vacancy_list)

# Посмотреть одну вакансию
@admin.route("/admin/vacancies/<int:id>")
def admin_view_vacancy(id):
    vacancy = Vacancy.query.get_or_404(id)
    return render_template("admin/view_vacancy.html", vacancy=vacancy)

# Добавить вакансию
@admin.route("/admin/vacancies/add", methods=['GET', 'POST'])
def admin_add_vacancy():
    form = AddVacancyForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        salary = form.salary.data if form.salary.data else None
        status = form.status.data
        date = form.date.data
        
        new_vacancy = Vacancy(title=title, content=content, salary=salary, status=status, date=date)
        db.session.add(new_vacancy)
        db.session.commit()
        flash("Вакансия добавлена успешно!", 'success')
        return redirect(url_for('admin.admin_vacancies'))
    
    return render_template("admin/add_vacancy.html", form=form)

# Изменить вакансию
@admin.route("/admin/vacancies/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_vacancy(id):
    vacancy = Vacancy.query.get_or_404(id)
    form = EditVacancyForm(obj=vacancy)

    if form.validate_on_submit():
        vacancy.title = form.title.data
        vacancy.content = form.content.data
        vacancy.salary = form.salary.data if form.salary.data else None
        vacancy.status = form.status.data
        vacancy.date = form.date.data
        
        db.session.commit()
        flash("Вакансия обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_vacancies'))

    return render_template("admin/edit_vacancy.html", form=form, vacancy=vacancy)

# Удалить вакансию
@admin.route("/admin/vacancies/delete/<int:id>", methods=['POST'])
def admin_delete_vacancy(id):
    vacancy = Vacancy.query.get_or_404(id)
    db.session.delete(vacancy)
    db.session.commit()
    flash("Вакансия удалена успешно!", 'success')
    return redirect(url_for('admin.admin_vacancies'))








@admin.route("/admin/employees")
def admin_employees():
    employee_list = Employee.query.all()
    return render_template("admin/employees_list.html", employee_list=employee_list)


@admin.route("/admin/employees/<int:id>")
def admin_view_employee(id):
    
    employee = Employee.query.get_or_404(id)
    
    return render_template("admin/view_employee.html", employee=employee)


@admin.route("/admin/employees/delete/<int:id>", methods=['POST'])
def admin_delete_employee(id):
    employee = Employee.query.get_or_404(id)
    if employee.photo:
        photo_path = os.path.join(os.getcwd(), 'backend', 'static', employee.photo)
        # Проверяем, существует ли файл, и удаляем его
        if os.path.exists(photo_path):
            os.remove(photo_path)
    db.session.delete(employee)
    db.session.commit()
    flash("Сотрудник удален успешно!", 'success')
    return redirect(url_for('admin.admin_employees'))


@admin.route("/admin/employees/add", methods=['GET', 'POST'])
def admin_add_employee():
    form = AddEmployeeForm()
    
    if form.validate_on_submit():
        name = form.name.data
        surname = form.surname.data
        patronymic = form.patronymic.data
        vacancy = form.vacancy.data
        photo_file = form.photo.data

        new_employee = Employee(
            name=name,
            surname=surname,
            patronymic=patronymic,
            vacancy=vacancy
        )

        if photo_file and allowed_file(photo_file.filename):
            UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend', 'static', 'uploads')

            # Создаем папку, если она еще не существует
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)
            filename = secure_filename(photo_file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            photo_file.save(filepath)
            
            # Сохраняем относительный путь, начиная с 'uploads'
            new_employee.photo = os.path.join('uploads', filename).replace("\\", "/")

        db.session.add(new_employee)
        db.session.commit()
        flash("Сотрудник добавлен успешно!", 'success')
        return redirect(url_for('admin.admin_employees'))
    
    return render_template("admin/add_employee.html", form=form)





def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

from PIL import Image
from werkzeug.utils import secure_filename
import os

@admin.route("/admin/employees/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_employee(id):
    employee = Employee.query.get_or_404(id)
    form = EditEmployeeForm(obj=employee)

    if form.validate_on_submit():
        employee.name = form.name.data
        employee.surname = form.surname.data
        employee.patronymic = form.patronymic.data
        employee.vacancy = form.vacancy.data

        old_photo_path = None
        if employee.photo:
            old_photo_path = os.path.join(os.getcwd(), 'backend', 'static', employee.photo)

        if form.photo.data:
            UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend', 'static', 'uploads')

            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            photo_file = form.photo.data
            if photo_file and allowed_file(photo_file.filename):
                # Генерация уникального имени файла с тем же расширением
                file_extension = photo_file.filename.rsplit('.', 1)[1].lower()
                unique_filename = f"{uuid.uuid4()}.{file_extension}"
                filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
                
                # Сохранение файла
                photo_file.save(filepath)

                # Изменение размера изображения
                image = Image.open(filepath)
                target_size = (300, 300)  # Укажите целевой размер (ширина, высота)
                image = image.resize(target_size, Image.Resampling.LANCZOS)

                # Определяем формат для сохранения
                if file_extension == 'jpg':
                    file_extension = 'jpeg'
                
                # Сохранение изображения с правильным форматом
                image.save(filepath, format=file_extension.upper(), quality=95)

                employee.photo = os.path.join('uploads', unique_filename).replace("\\", "/")

                # Удаление старого фото, если новое успешно загружено
                if old_photo_path and os.path.exists(old_photo_path):
                    os.remove(old_photo_path)

        db.session.commit()
        flash("Информация о сотруднике обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_employees'))

    return render_template("admin/edit_employee.html", form=form, employee=employee)
