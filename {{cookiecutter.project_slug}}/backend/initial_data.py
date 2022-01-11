
import logging
import sys
import os

from db.init_db import init_db
from db.session import SessionLocal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    db = SessionLocal()
    init_db(db)


def main() -> None:
    logger.info("Creating initial data")
    print("Creating initial data")
    init()
    logger.info("Initial data created")
    print("Initial data created")


if __name__ == "__main__":
    main()
