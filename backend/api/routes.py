from flask import Blueprint, Response, jsonify, current_app, request
from backend.models import Post, Documents, Project

import json
import os
import smtplib
from email.mime.text import MIMEText

api = Blueprint('api', __name__)






@api.route("/api/news", methods=['GET'])
def get_news():
    news_list = Post.query.all()
    news_data = [
        {
            "id": news.id,
            "date": news.date.strftime('%Y-%m-%d'), 
            "title": news.title,
            "content": news.content,
            "category": news.category,
            "image": news.image
        }
        for news in news_list
    ]
    response = Response(
        response=json.dumps(news_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/news/<int:id>", methods=['GET'])
def get_one_news(id):
    one_news = Post.query.get(id)
    if not one_news:
        return jsonify({"message": "News not found"}), 404

    one_news_data = {
        "id": one_news.id,
        "date": one_news.date.strftime('%Y-%m-%d'), 
        "title": one_news.title,
        "content": one_news.content,
        "category": one_news.category,
        "image": one_news.image
    }
    response = Response(
        response=json.dumps(one_news_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response

@api.route("/api/projects", methods=['GET'])
def get_projects():
    projects_list = Project.query.all()
    projects_data = [
        {
            "id": project.id,
            "name": project.name,
            "content": project.content,
            "image": project.image
        }
        for project in projects_list
    ]
    response = Response(
        response=json.dumps(projects_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/projects/<int:id>", methods=['GET'])
def get_one_project(id):
    project = Project.query.get(id)
    if not project:
        return jsonify({"message": "Project not found"}), 404

    project_data = {
        "id": project.id,
        "name": project.name,
        "content": project.content, 
        "image": project.image
    }
    response = Response(
        response=json.dumps(project_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/documents", methods=['GET'])
def get_documents():
    documents_list = Documents.query.all()
    documents_data = [
        {
            "id": document.id,
            "type": document.type,
            "name": document.name,
            "file_path": document.file_path
        }
        for document in documents_list
    ]
    response = Response(
        response=json.dumps(documents_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/documents/<int:id>", methods=['GET'])
def get_one_document(id):
    document = Documents.query.get(id)
    if not document:
        return jsonify({"message": "Document not found"}), 404

    document_data = {
        "id": document.id,
        "type": document.type,
        "name": document.name,
        "file_path": document.file_path
    }
    response = Response(
        response=json.dumps(document_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response




@api.route("/api/data", methods=['GET'])
def get_data():
    json_file_path = os.path.join(current_app.root_path, os.path.pardir, 'frontend', 'src', 'content.json')

    # Загружаем текущие данные из JSON
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Формируем ответ с ensure_ascii=False для корректного отображения русского текста
    response = Response(
        response=json.dumps(data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response




@api.route("/api/send-email", methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    organization = data.get('organization')
    message = data.get('message')

    # Создаем сообщение с указанием кодировки UTF-8
    msg = MIMEText(f"""
    ФИО: {name}
    Email: {email}
    Телефон: {phone}
    Организация: {organization}

    Сообщение:
    {message}
    """, _charset="cp1251")
    msg['Subject'] = f"Новое сообщение от {name}"
    msg['From'] = current_app.config['MAIL_USERNAME']
    msg['To'] = 'ilya423@yandex.ru'

    try:
        with smtplib.SMTP_SSL(current_app.config['MAIL_SERVER'], current_app.config['MAIL_PORT']) as server:
            server.login(current_app.config['MAIL_USERNAME'], current_app.config['MAIL_PASSWORD'])
            server.sendmail(msg['From'], [msg['To']], msg.as_string())
        return jsonify({"message": "Сообщение отправлено успешно"}), 200
    except Exception as e:
        print(f"Ошибка при отправке письма: {e}")
        return jsonify({"message": "Ошибка при отправке сообщения"}), 500