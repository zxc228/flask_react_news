from flask import Flask, Response
import json

app = Flask(__name__)

# Пример данных с русскими символами
news_data = [
    {"id": 1, "title": "Главные Новости 1", "content": "Это содержание главных новостей 1"},
    {"id": 2, "title": "Главные Новости 2", "content": "Это содержание главных новостей 2"},
    {"id": 3, "title": "Главные Новости 3", "content": "Это содержание главных новостей 3"},
]


@app.route('/api/news', methods=['GET'])
def get_news():
    response = Response(
        response=json.dumps(news_data, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == '__main__':
    app.run(debug=True)