import sys
import os
import logging

from sqlmodel import SQLModel, create_engine, select, Session

from {{cookiecutter.project_slug}}_core import schemas
from core import config
from core.security import get_password_hash
from db import base, session
import dependencies as deps
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:

    success = False
    while not success:
        try:
            engine = create_engine(config.settings.SQLALCHEMY_DATABASE_URI, echo=True)

            SQLModel.metadata.create_all(engine)
        except Exception as e:
            pass

    user = select(schemas.User)
    user = db.exec(user).first()
    if user:
        logger.info(user.__dict__)
    if not user:
        user = schemas.User(
            username="{{cookiecutter.admin_username}}",
            password=get_password_hash("{{cookiecutter.admin_password}}"),
            is_superuser=True
            )
        db.add(user)
        settings = schemas.Settings()
        settings.user = user
        db.add(settings)
        db.commit()
        db.refresh(user)
