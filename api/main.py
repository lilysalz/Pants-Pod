from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    admin,
    episodes,
    accounts,
    liked,
    comments,
    tell_us_anything,
)
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(episodes.router, tags=["Episodes"])
app.include_router(admin.router, tags=["Admin"])
app.include_router(authenticator.router, tags=["Auth"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(liked.router, tags=["Liked"])
app.include_router(comments.router, tags=["Comments"])
app.include_router(tell_us_anything.router, tags=["Submission"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST"),
        "https://pants-un-pantalon-3cd5e1310b934bdd7edb8327858c1710b57d26662d0c1.gitlab.io/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
