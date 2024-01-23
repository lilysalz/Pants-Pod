from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import date


class AccountIn(BaseModel):
    username: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOutWithHashedPassword(BaseModel):
    id: str
    username: str
    hashed_password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountToken(Token):
    account: AccountOut


class LikedIn(BaseModel):
    episode_id: str


class LikedOut(LikedIn):
    user_id: str


class LikedList(BaseModel):
    liked: list[LikedOut]


class Error(BaseModel):
    message: str


class SpotifyPodcast(BaseModel):
    podcast_id: str
    title: str
    description: str
    duration: int
    release_date: str
    url: str


class ApplePodcast(BaseModel):
    podcast_id: str
    title: str
    release_date: str
    url: str


class PodcastEpisode(BaseModel):
    spotify_id: str
    apple_id: str
    title: str
    description: str
    duration: str
    release_date: date
    spotify_url: str
    apple_url: str


class DeleteStatus(BaseModel):
    success: bool
