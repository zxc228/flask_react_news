from flask import Blueprint, render_template, request, redirect, url_for, flash
from backend.models import Post, Vacancy
from backend import db
from datetime import datetime

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
