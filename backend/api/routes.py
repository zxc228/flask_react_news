from flask import Blueprint, Response, jsonify
from backend.models import Post, Documents, Partners, Project
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
            "content": news.content,
            "category": news.category
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
        "category": one_news.category
    }
    response = Response(
        response=json.dumps(one_news_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response



