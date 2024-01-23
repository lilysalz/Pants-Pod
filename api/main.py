from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import admin, episodes, accounts, liked, comments, tell_me_anything
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(episodes.router, tags=['Episodes'])
app.include_router(admin.router, tags=["Admin"])
app.include_router(authenticator.router, tags=['Auth'])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(liked.router, tags=["Liked"])
app.include_router(comments.router, tags=["Comments"])
app.include_router(tell_me_anything.router, tags=["Submission"])



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
