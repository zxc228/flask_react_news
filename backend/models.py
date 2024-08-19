from backend import db
from datetime import datetime

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<News {self.title} - {self.date.strftime('%d %B %Y')}>"
    


class Vacancy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    salary = db.Column(db.String(255), nullable=True)  
    status = db.Column(db.Boolean, nullable=False, default=True)  

    def __repr__(self):
        return f"<Vacancy {self.title} - {self.date.strftime('%d %B %Y')}, Status: {'Active' if self.status else 'Inactive'}>"