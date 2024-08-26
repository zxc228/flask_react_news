from flask import Blueprint, render_template, request, redirect, url_for, flash
from backend.models import Post, Vacancy, Employee
from backend import db
from werkzeug.utils import secure_filename
from datetime import datetime
import os

admin = Blueprint('admin', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


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
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        date = datetime.strptime(request.form['date'], '%Y-%m-%d')
        
        new_news = Post(title=title, content=content, date=date)
        db.session.add(new_news)
        db.session.commit()
        flash("Новость добавлена успешно!", 'success')
        return redirect(url_for('admin.admin_news'))
    
    return render_template("admin/add_news.html", datetime=datetime)

# Изменить новость
@admin.route("/admin/news/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_news(id):
    news = Post.query.get_or_404(id)
    
    if request.method == 'POST':
        news.title = request.form['title']
        news.content = request.form['content']
        news.date = datetime.strptime(request.form['date'], '%Y-%m-%d')
        
        db.session.commit()
        flash("Новость обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_news'))
    
    return render_template("admin/edit_news.html", news=news)

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
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        salary = request.form['salary']
        status = True if request.form.get('status') == 'on' else False
        date = datetime.strptime(request.form['date'], '%Y-%m-%d')
        
        new_vacancy = Vacancy(title=title, content=content, salary=salary, status=status, date=date)
        db.session.add(new_vacancy)
        db.session.commit()
        flash("Вакансия добавлена успешно!", 'success')
        return redirect(url_for('admin.admin_vacancies'))
    
    return render_template("admin/add_vacancy.html", datetime=datetime)

# Изменить вакансию
@admin.route("/admin/vacancies/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_vacancy(id):
    vacancy = Vacancy.query.get_or_404(id)
    
    if request.method == 'POST':
        vacancy.title = request.form['title']
        vacancy.content = request.form['content']
        vacancy.salary = request.form['salary']
        vacancy.status = True if request.form.get('status') == 'on' else False
        vacancy.date = datetime.strptime(request.form['date'], '%Y-%m-%d')
        
        db.session.commit()
        flash("Вакансия обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_vacancies'))
    
    return render_template("admin/edit_vacancy.html", vacancy=vacancy)

# Удалить вакансию
@admin.route("/admin/vacancies/delete/<int:id>", methods=['POST'])
def admin_delete_vacancy(id):
    vacancy = Vacancy.query.get_or_404(id)
    db.session.delete(vacancy)
    db.session.commit()
    flash("Вакансия удалена успешно!", 'success')
    return redirect(url_for('admin.admin_vacancies'))





def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
    if request.method == 'POST':
        name = request.form['name']
        surname = request.form['surname']
        patronymic = request.form['patronymic']
        vacancy = request.form['vacancy']
        photo_file = request.files.get('photo')

        new_employee = Employee(
            name=name,
            surname=surname,
            patronymic=patronymic,
            vacancy=vacancy
        )

        if photo_file and allowed_file(photo_file.filename):
            UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend','static', 'uploads')

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
    
    return render_template("admin/add_employee.html")





@admin.route("/admin/employees/edit/<int:id>", methods=['GET', 'POST'])
def admin_edit_employee(id):
    employee = Employee.query.get_or_404(id)
    
    if request.method == 'POST':
        employee.name = request.form['name']
        employee.surname = request.form['surname']
        employee.patronymic = request.form['patronymic']
        employee.vacancy = request.form['vacancy']

        # Сохраняем старый путь к фото перед его возможной заменой
        old_photo_path = None
        if employee.photo:
            old_photo_path = os.path.join(os.getcwd(), 'backend', 'static', employee.photo)

        if 'photo' in request.files:
            UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend', 'static', 'uploads')

            # Создаем папку, если она еще не существует
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            photo_file = request.files['photo']
            if photo_file and allowed_file(photo_file.filename):
                filename = secure_filename(photo_file.filename)
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                photo_file.save(filepath)
    
                # Сохраняем новый путь, начиная с 'uploads'
                employee.photo = os.path.join('uploads', filename).replace("\\", "/")

                # Удаляем старое фото, если новое успешно загружено
                if old_photo_path and os.path.exists(old_photo_path):
                    os.remove(old_photo_path)
        
        db.session.commit()
        flash("Информация о сотруднике обновлена успешно!", 'success')
        return redirect(url_for('admin.admin_employees'))
    
    return render_template("admin/edit_employee.html", employee=employee)
