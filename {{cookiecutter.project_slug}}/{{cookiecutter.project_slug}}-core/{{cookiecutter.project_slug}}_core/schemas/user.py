from sqlalchemy.sql.expression import table
from .base import BaseModel
from sqlmodel import Relationship, Field, SQLModel
from typing import Optional


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    username: str
    password: str
    settings: "Settings" = Relationship(back_populates="user")
    is_superuser: bool = Field(default=False)


class Settings(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    theme: str = "dark"
    last_page: str = "Home"
    user: "User" = Relationship(back_populates="settings")
    user_id: int = Field(default=None, foreign_key="user.id")
