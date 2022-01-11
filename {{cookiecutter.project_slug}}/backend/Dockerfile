
FROM python:3.9

RUN mkdir /app
WORKDIR /app

RUN apt update

COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./{{cookiecutter.project_slug}}-core/requirements.txt /{{cookiecutter.project_slug}}-core/requirements.txt
RUN pip install -r /{{cookiecutter.project_slug}}-core/requirements.txt
COPY ./{{cookiecutter.project_slug}}-core /{{cookiecutter.project_slug}}-core
RUN pip install -e /{{cookiecutter.project_slug}}-core
COPY ./backend .
RUN ls
