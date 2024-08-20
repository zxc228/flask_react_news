import os


class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SECRET_KEY = '525252'
    SQLALCHEMY_TRACK_MODIFICATIONS = False