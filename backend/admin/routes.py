from flask import Blueprint, render_template, request, redirect, url_for, flash
from backend.models import Post, Project, Documents, Partners
from backend import db
from werkzeug.utils import secure_filename
from datetime import datetime
from backend.admin.forms import AddNewsForm, EditNewsForm, AddProjectForm, EditProjectForm, AddDocumentForm, EditDocumentForm
from flask import current_app
import os

admin = Blueprint('admin', __name__)

# Главная страница админки
@admin.route('/admin')
def index():
    return render_template('admin/index.html')

# Страница управления контентом (CMS)
@admin.route('/admin/cms')
def cms():
    return render_template('admin/cms.html')

# Страница управления БД (bd)
@admin.route('/admin/bd')
def bd():
    return render_template('admin/bd/bd.html')


# Показать все новости
@admin.route('/admin/bd/news')
def show_news():
    news = Post.query.order_by(Post.date.desc()).all()
    return render_template('admin/bd/news/show_news.html', news=news)

# Добавить новость
@admin.route('/admin/bd/news/add', methods=['GET', 'POST'])
def add_news():
    form = AddNewsForm()
    if form.validate_on_submit():
        news_item = Post(
            title=form.title.data,
            content=form.content.data,
            category=form.category.data,  # Выбранная категория
            date=datetime.utcnow()
        )
        db.session.add(news_item)
        db.session.commit()
        flash('Новость успешно добавлена!', 'success')
        return redirect(url_for('admin.show_news'))
    return render_template('admin/bd/news/add_news.html', form=form)

# Редактирование новости
@admin.route('/admin/bd/news/edit/<int:news_id>', methods=['GET', 'POST'])
def edit_news(news_id):
    news_item = Post.query.get_or_404(news_id)
    form = EditNewsForm()

    if request.method == 'GET':
        form.title.data = news_item.title
        form.content.data = news_item.content
        form.category.data = news_item.category  # Текущая категория

    if form.validate_on_submit():
        news_item.title = form.title.data
        news_item.content = form.content.data
        news_item.category = form.category.data  # Обновлённая категория
        db.session.commit()
        flash('Новость успешно обновлена!', 'success')
        return redirect(url_for('admin.show_news'))
    
    return render_template('admin/bd/news/edit_news.html', form=form, news_item=news_item)

# Удаление новости
@admin.route('/admin/bd/news/delete/<int:news_id>', methods=['POST'])
def delete_news(news_id):
    news_item = Post.query.get_or_404(news_id)
    db.session.delete(news_item)
    db.session.commit()
    flash('Новость успешно удалена!', 'success')
    return redirect(url_for('admin.show_news'))



# Показать все проекты
@admin.route('/admin/bd/projects')
def show_projects():
    projects = Project.query.order_by(Project.name).all()
    return render_template('admin/bd/projects/show_projects.html', projects=projects)

# Добавить проект
@admin.route('/admin/bd/projects/add', methods=['GET', 'POST'])
def add_project():
    form = AddProjectForm()
    if form.validate_on_submit():
        project = Project(
            name=form.name.data,
            content=form.content.data
        )
        db.session.add(project)
        db.session.commit()
        flash('Проект успешно добавлен!', 'success')
        return redirect(url_for('admin.show_projects'))
    return render_template('admin/bd/projects/add_project.html', form=form)

# Редактирование проекта
@admin.route('/admin/bd/projects/edit/<int:project_id>', methods=['GET', 'POST'])
def edit_project(project_id):
    project = Project.query.get_or_404(project_id)
    form = EditProjectForm()

    if request.method == 'GET':
        form.name.data = project.name
        form.content.data = project.content

    if form.validate_on_submit():
        project.name = form.name.data
        project.content = form.content.data
        db.session.commit()
        flash('Проект успешно обновлен!', 'success')
        return redirect(url_for('admin.show_projects'))
    
    return render_template('admin/bd/projects/edit_project.html', form=form, project=project)

# Удаление проекта
@admin.route('/admin/bd/projects/delete/<int:project_id>', methods=['POST'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    flash('Проект успешно удален!', 'success')
    return redirect(url_for('admin.show_projects'))


# Показать все документы
@admin.route('/admin/bd/documents')
def show_documents():
    documents = Documents.query.order_by(Documents.name).all()
    return render_template('admin/bd/documents/show_documents.html', documents=documents)

## Добавить документ
@admin.route('/admin/bd/documents/add', methods=['GET', 'POST'])
def add_document():
    form = AddDocumentForm()
    if form.validate_on_submit():
        # Путь к папке для сохранения файлов
        upload_folder = os.path.join(current_app.root_path, 'static/documents')

        # Проверяем, существует ли папка, если нет — создаем её
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        # Сохранение файла
        file = form.file.data
        filename = secure_filename(file.filename)  # Убедись, что здесь filename правильно обрабатывается
        file_path = os.path.join(upload_folder, filename)  # Путь сохранения файла
        file.save(file_path)

        document = Documents(
            type=form.type.data,
            name=form.name.data,
            file_path=filename  # Сохраняем имя файла (например, document.docx)
        )
        db.session.add(document)
        db.session.commit()
        flash('Документ успешно добавлен!', 'success')
        return redirect(url_for('admin.show_documents'))
    return render_template('admin/bd/documents/add_document.html', form=form)

# Редактирование документа
@admin.route('/admin/bd/documents/edit/<int:document_id>', methods=['GET', 'POST'])
def edit_document(document_id):
    document = Documents.query.get_or_404(document_id)
    form = EditDocumentForm()

    if request.method == 'GET':
        form.type.data = document.type
        form.name.data = document.name

    if form.validate_on_submit():
        if form.file.data:  # Если загружен новый файл, то обновим его
            # Путь к папке для сохранения файлов
            upload_folder = os.path.join(current_app.root_path, 'static/documents')

            # Проверяем, существует ли папка, если нет — создаем её
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            file = form.file.data
            filename = secure_filename(file.filename)
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            document.file_path = filename  # Обновляем путь к новому файлу
        
        document.type = form.type.data
        document.name = form.name.data
        db.session.commit()
        flash('Документ успешно обновлен!', 'success')
        return redirect(url_for('admin.show_documents'))
    
    return render_template('admin/bd/documents/edit_document.html', form=form, document=document)


# Удаление документа
@admin.route('/admin/bd/documents/delete/<int:document_id>', methods=['POST'])
def delete_document(document_id):
    document = Documents.query.get_or_404(document_id)
    db.session.delete(document)
    db.session.commit()
    flash('Документ успешно удален!', 'success')
    return redirect(url_for('admin.show_documents'))