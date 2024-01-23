from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import date
from typing import List


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
    id: str
    user_id: str


class LikedList(BaseModel):
    liked: List[LikedOut]


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

class CommentsIn(BaseModel):
    episode_id: str
    comment_text: str
    comment_datetime: date

class CommentsOut(CommentsIn):
    id: str
    user_id: str

class CommentsList(BaseModel):
    comments: List[CommentsOut]

class Tell_me_anythingIn(BaseModel):
    submission_text: str
    submission_datetime: date

class Tell_me_anythingOut(Tell_me_anythingIn):
    id: str
    user_id: str

class Tell_me_anythingList(BaseModel):
    submission: List[Tell_me_anythingOut]
