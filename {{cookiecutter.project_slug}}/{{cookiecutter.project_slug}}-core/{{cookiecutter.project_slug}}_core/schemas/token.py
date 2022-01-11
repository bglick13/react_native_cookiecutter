
from typing import Optional

from sqlmodel import SQLModel


class Token(SQLModel):
    access_token: str
    token_type: str
    user_id: int
    is_super_user: bool


class TokenPayload(SQLModel):
    sub: Optional[int] = None
