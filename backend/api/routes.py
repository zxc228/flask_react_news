from flask import Blueprint, Response, jsonify
from backend.models import Post, Vacancy, Employee
import json

api = Blueprint('api', __name__)


@api.route("/api/news", methods=['GET'])
def get_news():
    news_list = Post.query.all()
    news_data = [
        {
            "id": news.id,
            "date": news.date.strftime('%Y-%m-%d'), 
            "title": news.title,
            "content": news.content
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
        "content": one_news.content
    }
    response = Response(
        response=json.dumps(one_news_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response



@api.route("/api/vacancies", methods=['GET'])
def get_vacancies():
    vacancy_list = Vacancy.query.all()
    vacancy_data = [
        {
            "id": vacancy.id,
            "date": vacancy.date.strftime('%Y-%m-%d'),
            "title": vacancy.title,
            "content": vacancy.content,
            "salary": vacancy.salary,
            "status": "Active" if vacancy.status else "Inactive"
        }
        for vacancy in vacancy_list
    ]
    response = Response(
        response=json.dumps(vacancy_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/vacancies/<int:id>", methods=['GET'])
def get_one_vacancy(id):
    one_vacancy = Vacancy.query.get(id)
    if not one_vacancy:
        return Response(
            response=json.dumps({"message": "Vacancy not found"}, ensure_ascii=False),
            status=404,
            mimetype='application/json'
        )

    one_vacancy_data = {
        "id": one_vacancy.id,
        "date": one_vacancy.date.strftime('%Y-%m-%d'),
        "title": one_vacancy.title,
        "content": one_vacancy.content,
        "salary": one_vacancy.salary,
        "status": "Active" if one_vacancy.status else "Inactive"
    }
    response = Response(
        response=json.dumps(one_vacancy_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/employees", methods=['GET'])
def get_employees():
    employees_list = Employee.query.all()
    employees_data = [
        {
            "id": employee.id,
            "name": employee.name,
            "surname": employee.surname,
            "patronimyc": employee.patronymic,
            "vacancy": employee.vacancy,
            "photo": employee.photo
        }
        for employee in employees_list
    ]
    response = Response(
        response=json.dumps(employees_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


@api.route("/api/employee/<int:id>", methods=['GET'])
def get_one_employee(id):
    one_employee = Employee.query.get(id)
    if not one_employee:
        return Response(
            response=json.dumps({"message": "Employee not found"}, ensure_ascii=False),
            status=404,
            mimetype='application/json'
        )

    one_employee_data = {
        {
            "id": one_employee.id,
            "name": one_employee.name,
            "surname": one_employee.surname,
            "patronimyc": one_employee.patronymic,
            "vacancy": one_employee.vacancy,
            "photo": one_employee.photo
        }
    }
    response = Response(
        response=json.dumps(one_employee_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response
