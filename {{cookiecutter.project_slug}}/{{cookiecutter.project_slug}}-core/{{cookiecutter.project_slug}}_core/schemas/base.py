from pydantic import BaseModel as BM
from pydantic import Field
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel, create_engine


class BaseModel(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
