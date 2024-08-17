from flask import Blueprint, Response, request, jsonify
from backend.models import Post
import json
from backend import db
from datetime import datetime

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

@api.route("/api/news", methods=['POST'])
def add_news():
    data = request.get_json()
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d')
    
    new_news = Post(date=date_obj, title=data['title'], content=data['content'])
    db.session.add(new_news)
    db.session.commit()
    return jsonify({"message": "News added successfully!"}), 201


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