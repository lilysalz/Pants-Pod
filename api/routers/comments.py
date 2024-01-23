from fastapi import APIRouter, Depends
from authenticator import authenticator
from models import (
    CommentsIn,
    CommentsOut,
    CommentsList,
    EpisodeCommentsList,
    DeleteStatus
)
from queries.comments import (
    CommentsRepo,
)

router = APIRouter()

@router.post("/api/comments/me", response_model=CommentsOut)
def create_comments(
    comments: CommentsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentsRepo = Depends()
):
    return repo.create_comments(
        comments=comments,
        user_id=account_data['id']
    )

@router.get("/api/comments/me", response_model=CommentsList)
def get_comments(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentsRepo = Depends()
):
    return {
        "comments": repo.get_comments(user_id=account_data['id'])
    }

@router.get("/api/comments/{episode_id}", response_model=EpisodeCommentsList)
def get_episode_comments(
    episode_id: str,
    repo: CommentsRepo = Depends()
):
    return {
        'comments': repo.get_episode_comments(episode_id=episode_id)
    }

@router.delete("/api/comments/me", response_model=DeleteStatus)
def delete_comments(
    episode_id: str,
    id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentsRepo = Depends(),
) -> bool:
    return {
        "success": repo.delete_comments(
            episode_id=episode_id,
            id= id,
            user_id=int(account_data['id'])
            )
    }
