from fastapi import APIRouter, Depends
from typing import Union
from authenticator import authenticator
from models import LikedIn, LikedOut, LikedList, DeleteStatus, Error
from queries.liked import (
    LikedRepository,
)

router = APIRouter()


@router.post("/api/episodes/liked/me", response_model=Union[LikedOut, Error])
def create_liked_episode(
    liked_in: LikedIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikedRepository = Depends(),
):
    return repo.create_liked_episode(
        liked_in=liked_in, user_id=account_data["id"]
    )


@router.get("/api/episodes/liked/me", response_model=LikedList)
def get_liked_episodes(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikedRepository = Depends(),
):
    return {"liked": repo.get_liked_episodes(user_id=account_data["id"])}


@router.delete("/api/episodes/liked/me", response_model=DeleteStatus)
def delete_liked_episode(
    episode_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LikedRepository = Depends(),
) -> bool:
    return {
        "success": repo.delete_liked_episode(
            episode_id=episode_id, user_id=int(account_data["id"])
        )
    }
