import sys, os

from sqlmodel import Session, select
from fastapi import Depends
import argparse
import secrets

from {{cookiecutter.project_slug}}_core import schemas
from core import config
from db import base, session
from db.session import SessionLocal
import dependencies as deps


def run(username: str) -> None:
    db = SessionLocal()
    new_superuser(db, username)


def new_superuser(db: Session, username: str) -> None:
    user = select(schemas.User)
    user = db.exec(user).first()
    if not user:
        password = secrets.token_urlsafe()
        print(f"password: {password}")
    
        user_in = schemas.User(
            username=username,
            password=password,
            is_superuser=True,
        )
        db.add(user_in)
        db.commit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process some integers.")
    parser.add_argument("username", type=str, help="Username for new privileged user")

    args = parser.parse_args()
    run(args.username)
