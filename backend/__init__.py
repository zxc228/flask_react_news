from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from backend.config import Config
from flask_migrate import Migrate
from flask_mail import Mail

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config.from_object(Config)

    db.init_app(app)
    mail.init_app(app)

    from backend.models import Post, Project, Documents # Убедитесь, что это правильный путь к вашим моделям

    migrate.init_app(app, db)

    from backend.api.routes import api
    from backend.admin.routes import admin
    print('Registering blueprints...')

    app.register_blueprint(api)
    app.register_blueprint(admin)

    print("Application created successfully!")

    return app