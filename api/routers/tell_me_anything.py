from fastapi import APIRouter, Depends
from authenticator import authenticator
from models import (
    Tell_me_anythingIn,
    Tell_me_anythingOut,
    Tell_me_anythingList,
    DeleteStatus
)
from queries.tell_me_anything import (
    TellRepo,
)

router = APIRouter()

@router.post("/api/tell_me_anything/me", response_model=Tell_me_anythingOut)
def create_submission(
    tell_me_anything: Tell_me_anythingIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends()
):
    return repo.create_tell_me_anything(
        tell_me_anything=tell_me_anything,
        user_id=account_data['id']
    )

@router.get("/api/tell_me_anything/me", response_model=Tell_me_anythingList)
def get_submission(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends()
):
    return {
        "submission": repo.get_tell_me_anything(user_id=account_data['id'])
    }

@router.delete("/api/tell_me_anything/me", response_model=DeleteStatus)
def delete_submission(
    id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends(),
) -> bool:
    return {
        "success": repo.delete_tell_me_anything(
            id= id,
            user_id=int(account_data['id'])
            )
    }
