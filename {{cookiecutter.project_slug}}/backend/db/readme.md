# Database Migrations
- Migrations are handled using Alembic
- The first time the project is initialized, run ```alembic init alembic```
    - This will create the default structure for an alembic project in the app
- When changes to the db are made, run:
  - ```alembic revision --autogenerate -m "..."```
- To enact the changes from this revision, run:
    - ```alembic upgrade head```