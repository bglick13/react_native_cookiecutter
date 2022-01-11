from fastapi import FastAPI, Depends, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm

import datetime
from starlette.requests import Request
import uvicorn
from {{cookiecutter.project_slug}}_core.utils import *
from {{cookiecutter.project_slug}}_core import schemas
from typing import List
import dependencies as deps
from core import security
from core import config
from sqlmodel import Session, select

app = FastAPI(title="{{cookiecutter.project_slug}}",
              docs_url="/api/docs", openapi_url="/api")

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:19006",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


@app.post("/api/v1/login", response_model=schemas.Token)
async def login(
    *,
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = db.exec(select(schemas.User).where(schemas.User.username == form_data.username)).first()
    if user:
        if security.verify_password(form_data.password, user.password):
            access_token_expires = datetime.timedelta(minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)

            at = security.create_access_token(
                    user.id, expires_delta=access_token_expires)

            return {
                "access_token": at,
                "token_type": "bearer",
                "user_id": user.id,
                'is_super_user': user.is_superuser
            }
    raise HTTPException(status_code=400, detail="Incorrect email or password")

@app.get('/api/v1/settings', response_model=schemas.Settings)
async def settings(
    settings: schemas.Settings = Depends(deps.get_settings)):
    return settings


@app.post('/api/v1/settings', response_model=schemas.Settings)
async def update_settings(
    *,
    db: Session = Depends(deps.get_db),
    settings_in: schemas.Settings,
    settings: schemas.Settings = Depends(deps.get_settings)
):
    for key, value in settings_in.dict().items():
        if key in settings:
            setattr(settings, key, value)
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
