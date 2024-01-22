from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union, Optional
from authenticator import authenticator
from models import(
    LikedIn,
    LikedOut,
    LikedList,
    DeleteStatus,
    Error
)
from queries.liked import (
    LikedRepository,
)

router = APIRouter()


@router.post("/api/episodes/liked", response_model=LikedOut)
def create_liked_episode(
    liked_in: LikedIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikedRepository = Depends()
):
    return repo.create_liked_episode(liked_in=liked_in, user_id=account_data['id'])


@router.get("/api/episodes/liked", response_model=LikedList)
def get_liked_episodes():
    pass


@router.delete("/api/episodes/liked", response_model=DeleteStatus)
def delete_liked_episode():
    pass
