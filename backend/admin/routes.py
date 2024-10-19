from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from backend.models import Post, Project, Documents
from backend import db
from werkzeug.utils import secure_filename
from datetime import datetime
from backend.admin.forms import AddNewsForm, EditNewsForm, AddProjectForm, EditProjectForm, AddDocumentForm, EditDocumentForm, EditMainContentForm
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FieldList, FormField, SubmitField
from wtforms.validators import DataRequired
import os
import mimetypes
import json
import uuid


admin = Blueprint('admin', __name__)

# Главная страница админки
@admin.route('/admin')
def index():
    return render_template('admin/index.html')

# Страница управления контентом (CMS)
@admin.route('/admin/cms')
def cms():
    return render_template('admin/cms/cms.html')

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

# Добавить документ
@admin.route('/admin/bd/documents/add', methods=['GET', 'POST'])
def add_document():
    form = AddDocumentForm()
    if form.validate_on_submit():
        upload_folder = os.path.join(current_app.root_path, 'static', 'documents')

        # Создаем папку, если она не существует
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        file = form.file.data
        if not file.filename:
            flash('Файл не содержит имени!', 'danger')
            return redirect(url_for('admin.add_document'))

        # Получение безопасного имени файла
        original_filename = secure_filename(file.filename)

        # Извлекаем расширение файла
        name, ext = os.path.splitext(original_filename)
        if not ext:
            # Используем mimetypes для попытки определить тип файла и добавить расширение
            mime_type = file.mimetype
            extension = mimetypes.guess_extension(mime_type)
            if extension:
                ext = extension
            else:
                flash('Не удалось определить тип файла!', 'danger')
                return redirect(url_for('admin.add_document'))

        # Формируем имя файла: Имя из формы + дата + расширение
        filename = f"{form.name.data}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}{ext}"
        file_path = os.path.join(upload_folder, filename)

        # Сохраняем файл
        try:
            file.save(file_path)
        except Exception as e:
            flash(f"Ошибка при сохранении файла: {str(e)}", 'danger')
            return redirect(url_for('admin.add_document'))

        # Создаем запись в базе данных
        document = Documents(
            type=form.type.data,
            name=form.name.data,
            file_path=filename  # Сохраняем путь только к файлу, чтобы потом работать с ним через 'static/documents'
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
        upload_folder = os.path.join(current_app.root_path, 'static', 'documents')

        if form.file.data:  # Если загружен новый файл
            # Удаление старого файла
            old_file_path = os.path.join(upload_folder, document.file_path)
            if os.path.exists(old_file_path):
                os.remove(old_file_path)

            file = form.file.data
            original_filename = secure_filename(file.filename)

            # Извлекаем расширение файла
            name, ext = os.path.splitext(original_filename)
            if not ext:
                mime_type = file.mimetype
                extension = mimetypes.guess_extension(mime_type)
                if extension:
                    ext = extension
                else:
                    flash('Не удалось определить тип файла!', 'danger')
                    return redirect(url_for('admin.edit_document', document_id=document_id))

            # Формируем новое имя файла: Имя из формы + дата + расширение
            filename = f"{form.name.data}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}{ext}"
            file_path = os.path.join(upload_folder, filename)

            # Сохраняем новый файл
            try:
                file.save(file_path)
            except Exception as e:
                flash(f"Ошибка при сохранении файла: {str(e)}", 'danger')
                return redirect(url_for('admin.edit_document', document_id=document_id))

            # Обновляем путь к новому файлу в базе данных
            document.file_path = filename

        # Обновляем остальные поля
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

    # Удаление файла с диска
    upload_folder = os.path.join(current_app.root_path, 'static', 'documents')
    file_path = os.path.join(upload_folder, document.file_path)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Удаляем запись из базы данных
    db.session.delete(document)
    db.session.commit()
    flash('Документ успешно удален!', 'success')
    return redirect(url_for('admin.show_documents'))

# CMS
#main content
@admin.route('/admin/cms/edit_main_content', methods=['GET', 'POST'])
def edit_main_content():
    # Путь к JSON файлу - подняться на уровень выше с помощью os.path.pardir
    json_file_path = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')

    # Проверка на существование файла (можно временно добавить для отладки)
    print(f"Путь к JSON: {json_file_path}")

    # Загружаем текущие данные из JSON
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    form = EditMainContentForm()

    if request.method == 'GET':
        # Заполняем форму текущими значениями из JSON
        form.title.data = data.get('title', '')
        form.mission_title.data = data['mission'].get('title', '')
        form.mission_description1.data = data['mission'].get('description1', '')
        form.mission_description2.data = data['mission'].get('description2', '')

    if form.validate_on_submit():
        # Обновляем данные из формы
        data['title'] = form.title.data
        data['mission']['title'] = form.mission_title.data
        data['mission']['description1'] = form.mission_description1.data
        data['mission']['description2'] = form.mission_description2.data

        # Сохраняем изменения обратно в JSON файл
        try:
            with open(json_file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            flash('Контент успешно обновлен!', 'success')
        except Exception as e:
            flash(f'Ошибка при сохранении данных: {str(e)}', 'danger')

        return redirect(url_for('admin.cms'))

    return render_template('admin/cms/main_page/edit_main_content.html', form=form)


#Info page
# Функция для загрузки JSON файла
def load_json():

    json_file_path = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')
    with open(json_file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Функция для сохранения изменений в JSON файл
def save_json(data):

    json_file_path = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# Показать контент infoPage
@admin.route('/admin/cms/info')
def show_info():
    data = load_json()
    return render_template('admin/cms/info_page/info_page.html', infoPage=data['infoPage'])

# Добавление новой основной направления
@admin.route('/admin/cms/info/add_main_direction', methods=['POST'])
def add_main_direction():
    data = load_json()
    new_direction = request.form.get('new_direction')

    if new_direction:
        data['infoPage']['mainDirections'].append(new_direction)
        save_json(data)
        flash('Новое направление успешно добавлено!', 'success')
    else:
        flash('Направление не может быть пустым!', 'danger')

    return redirect(url_for('admin.show_info'))

# Удаление направления
@admin.route('/admin/cms/info/delete_main_direction/<int:index>', methods=['POST'])
def delete_main_direction(index):
    data = load_json()
    try:
        del data['infoPage']['mainDirections'][index]
        save_json(data)
        flash('Направление успешно удалено!', 'success')
    except IndexError:
        flash('Неверный индекс!', 'danger')

    return redirect(url_for('admin.show_info'))

# Редактирование направления
@admin.route('/admin/cms/info/edit_main_direction/<int:index>', methods=['POST'])
def edit_main_direction(index):
    data = load_json()
    updated_direction = request.form.get('updated_direction')

    if updated_direction:
        try:
            data['infoPage']['mainDirections'][index] = updated_direction
            save_json(data)
            flash('Направление успешно обновлено!', 'success')
        except IndexError:
            flash('Неверный индекс!', 'danger')
    else:
        flash('Новое значение не может быть пустым!', 'danger')

    return redirect(url_for('admin.show_info'))

# Пример страницы управления контентом infoPage
@admin.route('/admin/cms/info/edit', methods=['GET', 'POST'])
def edit_info_page():
    data = load_json()

    if request.method == 'POST':
        # Редактирование основной информации
        data['infoPage']['management'][0]['position'] = request.form.get('general_manager_position')

        save_json(data)
        flash('Контент успешно обновлен!', 'success')
        return redirect(url_for('admin.show_info'))

    return render_template('admin/cms/info_page/edit_info_page.html', infoPage=data['infoPage'])

# Добавление новой должности
@admin.route('/admin/cms/info/add_management_position', methods=['POST'])
def add_management_position():
    data = load_json()
    new_position = request.form.get('new_position')

    if new_position:
        new_id = len(data['infoPage']['management']) + 1
        data['infoPage']['management'].append({"position": new_position, "id": new_id})
        save_json(data)
        flash('Новая должность успешно добавлена!', 'success')
    else:
        flash('Должность не может быть пустой!', 'danger')

    return redirect(url_for('admin.show_info'))

# Удаление должности
@admin.route('/admin/cms/info/delete_management_position/<int:index>', methods=['POST'])
def delete_management_position(index):
    data = load_json()
    try:
        del data['infoPage']['management'][index]
        save_json(data)
        flash('Должность успешно удалена!', 'success')
    except IndexError:
        flash('Неверный индекс!', 'danger')

    return redirect(url_for('admin.show_info'))

# Редактирование должности
@admin.route('/admin/cms/info/edit_management_position/<int:index>', methods=['POST'])
def edit_management_position(index):
    data = load_json()
    updated_position = request.form.get('updated_position')

    if updated_position:
        try:
            data['infoPage']['management'][index]['position'] = updated_position
            save_json(data)
            flash('Должность успешно обновлена!', 'success')
        except IndexError:
            flash('Неверный индекс!', 'danger')
    else:
        flash('Новое значение не может быть пустым!', 'danger')

    return redirect(url_for('admin.show_info'))

# Добавление новой аттестации
@admin.route('/admin/cms/info/add_attestation', methods=['POST'])
def add_attestation():
    data = load_json()
    new_attestation = request.form.get('new_attestation')

    if new_attestation:
        data['infoPage']['attestations'].append(new_attestation)
        save_json(data)
        flash('Новая аттестация успешно добавлена!', 'success')
    else:
        flash('Аттестация не может быть пустой!', 'danger')

    return redirect(url_for('admin.show_info'))

# Удаление аттестации
@admin.route('/admin/cms/info/delete_attestation/<int:index>', methods=['POST'])
def delete_attestation(index):
    data = load_json()
    try:
        del data['infoPage']['attestations'][index]
        save_json(data)
        flash('Аттестация успешно удалена!', 'success')
    except IndexError:
        flash('Неверный индекс!', 'danger')

    return redirect(url_for('admin.show_info'))

# Редактирование аттестации
@admin.route('/admin/cms/info/edit_attestation/<int:index>', methods=['POST'])
def edit_attestation(index):
    data = load_json()
    updated_attestation = request.form.get('updated_attestation')

    if updated_attestation:
        try:
            data['infoPage']['attestations'][index] = updated_attestation
            save_json(data)
            flash('Аттестация успешно обновлена!', 'success')
        except IndexError:
            flash('Неверный индекс!', 'danger')
    else:
        flash('Новое значение не может быть пустым!', 'danger')

    return redirect(url_for('admin.show_info'))



# Путь для загрузки изображений




def handle_photo(file, old_photo=None):
    # Папка для загрузки файлов (в папку статических файлов Flask)
    UPLOAD_FOLDER = os.path.join(current_app.root_path, 'static', 'employees')
    
    # Создаем папку, если она не существует
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    # Удаление старого фото, если оно существует
    if old_photo:
        old_photo_path = os.path.join(current_app.root_path, old_photo.lstrip('/'))
        if os.path.exists(old_photo_path):
            os.remove(old_photo_path)
    
    # Безопасное имя файла
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    # Сохраняем файл
    file.save(filepath)
    
    # Возвращаем путь без `/static`
    return f"employees/{filename}"



@admin.route('/admin/cms/employees/employees_sync', methods=['GET', 'POST'])
def employees_sync():
    data = load_json()

    management = data['infoPage'].get('management', [])
    employees = data.get('employees', [])

    # Синхронизация данных management и employees
    for manager in management:
        # Проверяем, существует ли сотрудник с данным id в employees
        employee = next((emp for emp in employees if emp['id'] == manager['id']), None)
        if not employee:
            # Если не существует, создаем запись с базовой информацией
            new_employee = {
                "id": manager['id'],
                "name": manager['position'],  # По умолчанию имя как позиция
                "position": manager['position'],
                "description": "",  # Пустое описание
                "photo": ""  # Без фото
            }
            employees.append(new_employee)

    # Сохраняем синхронизированные данные
    data['employees'] = employees
    save_json(data)

    # Обработка формы
    if request.method == 'POST':
        emp_id = int(request.form.get('id'))
        employee = next((emp for emp in employees if emp['id'] == emp_id), None)

        if employee:
            # Обновляем данные сотрудника только если новые данные были введены
            name = request.form.get('name')
            description = request.form.get('description')
            file = request.files.get('photo')

            # Только обновляем, если есть новые значения
            if name and name.strip():
                employee['name'] = name.strip()

            if description and description.strip():
                employee['description'] = description.strip()

            # Обработка фото
            if file and file.filename:
                # Передаем старое фото для удаления
                old_photo = employee.get('photo', None)
                employee['photo'] = handle_photo(file, old_photo)

            # Сохраняем обновленные данные
            save_json(data)
            flash('Информация о сотруднике успешно обновлена!', 'success')

        else:
            flash('Сотрудник не найден!', 'danger')

        return redirect(url_for('admin.employees_sync'))

    return render_template('admin/cms/employees/employees_sync.html', employees=employees)


#УСЛУГИ
# Показать список услуг
@admin.route('/admin/cms/services')
def show_services():
    data = load_json()
    services = data.get('services', [])
    return render_template('admin/cms/services/services_list.html', services=services)



# Добавить новую услугу
@admin.route('/admin/cms/services/add', methods=['POST'])
def add_service():
    data = load_json()
    services = data.get('services', [])

    title = request.form.get('title')
    description = request.form.get('description')

    if title and description:
        new_service = {
            "title": title,
            "description": description
        }
        services.append(new_service)
        save_json(data)
        flash('Новая услуга успешно добавлена!', 'success')
    else:
        flash('Название и описание услуги не могут быть пустыми!', 'danger')

    return redirect(url_for('admin.show_services'))


# Редактировать услугу
@admin.route('/admin/cms/services/edit/<int:index>', methods=['POST'])
def edit_service(index):
    data = load_json()
    services = data.get('services', [])

    if index < 0 or index >= len(services):
        flash('Неверный индекс услуги!', 'danger')
        return redirect(url_for('admin.show_services'))

    title = request.form.get('title')
    description = request.form.get('description')

    if title and description:
        services[index]['title'] = title
        services[index]['description'] = description
        save_json(data)
        flash('Услуга успешно обновлена!', 'success')
    else:
        flash('Название и описание услуги не могут быть пустыми!', 'danger')

    return redirect(url_for('admin.show_services'))


# Удалить услугу
@admin.route('/admin/cms/services/delete/<int:index>', methods=['POST'])
def delete_service(index):
    data = load_json()
    services = data.get('services', [])

    if index < 0 or index >= len(services):
        flash('Неверный индекс услуги!', 'danger')
        return redirect(url_for('admin.show_services'))

    del services[index]
    save_json(data)
    flash('Услуга успешно удалена!', 'success')

    return redirect(url_for('admin.show_services'))


# Партнеры
# Показать список партнеров
@admin.route('/admin/cms/partners')
def show_partners():
    data = load_json()
    partners = data.get('partners', [])
    return render_template('admin/cms/partners/partners_list.html', partners=partners)

# Загрузка и сохранение изображения (логотипа) с уникальным именем
def handle_logo(file):
    if file and file.filename:
        UPLOAD_FOLDER = os.path.join(current_app.root_path, 'static', 'logos')
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)

        # Генерация уникального имени для файла
        ext = file.filename.split('.')[-1]
        filename = f"{uuid.uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return f"/logos/{filename}"
    return ""  # Возвращаем пустую строку, если файл не загружен

# Удаление файла логотипа
def delete_logo(logo_path):
    if logo_path:
        logo_full_path = os.path.join(current_app.root_path, logo_path.lstrip('/'))
        if os.path.exists(logo_full_path):
            os.remove(logo_full_path)

# Добавить нового партнера
@admin.route('/admin/cms/partners/add', methods=['POST'])
def add_partner():
    data = load_json()
    partners = data.get('partners', [])

    # Получение данных из формы
    name = request.form.get('name')
    description = request.form.get('description')
    details = request.form.get('details')
    website = request.form.get('website')
    cooperation = request.form.get('cooperation')

    # Проверяем файл логотипа
    file = request.files.get('logo')
    logo = handle_logo(file)

    if name and description:
        # Генерация уникального ID
        max_id = max([partner['id'] for partner in partners], default=0)  # Если список пуст, max_id будет 0
        new_partner = {
            "id": max_id + 1,  # Новый ID будет больше текущего максимального на 1
            "name": name,
            "description": description,
            "logo": logo,  # Логотип (может быть пустым)
            "details": details,
            "website": website,
            "cooperation": cooperation
        }
        partners.append(new_partner)
        save_json(data)
        flash('Новый партнер успешно добавлен!', 'success')
    else:
        flash('Название и описание партнера не могут быть пустыми!', 'danger')

    return redirect(url_for('admin.show_partners'))

# Редактировать партнера
@admin.route('/admin/cms/partners/edit/<int:index>', methods=['POST'])
def edit_partner(index):
    data = load_json()
    partners = data.get('partners', [])

    if index < 0 or index >= len(partners):
        flash('Неверный индекс партнера!', 'danger')
        return redirect(url_for('admin.show_partners'))

    # Получение данных из формы
    name = request.form.get('name')
    description = request.form.get('description')
    details = request.form.get('details')
    website = request.form.get('website')
    cooperation = request.form.get('cooperation')

    # Проверяем файл логотипа
    file = request.files.get('logo')
    if file and file.filename:
        # Удаляем старый логотип, если загружен новый
        if partners[index]['logo']:
            delete_logo(partners[index]['logo'])

        # Сохраняем новый логотип с уникальным именем
        logo = handle_logo(file)
    else:
        logo = partners[index]['logo']  # Если логотип не загружен, оставляем старый

    if name and description:
        partners[index]['name'] = name
        partners[index]['description'] = description
        partners[index]['logo'] = logo  # Обновляем логотип, если он загружен
        partners[index]['details'] = details
        partners[index]['website'] = website
        partners[index]['cooperation'] = cooperation
        save_json(data)
        flash('Партнер успешно обновлен!', 'success')
    else:
        flash('Название и описание партнера не могут быть пустыми!', 'danger')

    return redirect(url_for('admin.show_partners'))

# Удалить партнера
@admin.route('/admin/cms/partners/delete/<int:index>', methods=['POST'])
def delete_partner(index):
    data = load_json()
    partners = data.get('partners', [])

    if index < 0 or index >= len(partners):
        flash('Неверный индекс партнера!', 'danger')
        return redirect(url_for('admin.show_partners'))

    # Удаляем логотип партнера
    delete_logo(partners[index]['logo'])

    # Удаляем партнера из списка
    del partners[index]

    # Обновляем ID всех партнёров после удаления
    for i, partner in enumerate(partners):
        partner['id'] = i + 1

    save_json(data)
    flash('Партнер успешно удален!', 'success')

    return redirect(url_for('admin.show_partners'))


import shutil

# Маршрут для создания резервной копии JSON
@admin.route('/admin/cms/backup', methods=['POST'])
def create_backup():
    MAIN_JSON_FILE = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')
    BACKUP_JSON_FILE = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'backup_content.json')
    try:
        shutil.copyfile(MAIN_JSON_FILE, BACKUP_JSON_FILE)
        flash('Резервная копия успешно создана!', 'success')
    except Exception as e:
        flash(f"Ошибка при создании резервной копии: {str(e)}", 'danger')

    return redirect(url_for('admin.index'))



# Маршрут для восстановления резервной копии
@admin.route('/admin/cms/restore_backup', methods=['POST'])
def restore_backup():
    MAIN_JSON_FILE = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')
    BACKUP_JSON_FILE = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'backup_content.json')
    try:
        if os.path.exists(BACKUP_JSON_FILE):
            shutil.copyfile(BACKUP_JSON_FILE, MAIN_JSON_FILE)
            flash('Резервная копия успешно восстановлена!', 'success')
        else:
            flash('Резервная копия не найдена!', 'danger')
    except Exception as e:
        flash(f"Ошибка при восстановлении резервной копии: {str(e)}", 'danger')

    return redirect(url_for('admin.index'))

