from sqlmodel import create_engine, Session
import sys
import os
from functools import partial
from core import config

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

print(f"connecting to {config.settings.SQLALCHEMY_DATABASE_URI}")
engine = create_engine(config.settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = partial(Session, engine)
