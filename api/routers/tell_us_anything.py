from fastapi import APIRouter, Depends
from authenticator import authenticator
from models import (
    Tell_us_anythingIn,
    Tell_us_anythingOut,
    Tell_us_anythingList,
    DeleteStatus,
)
from queries.tell_us_anything import (
    TellRepo,
)

router = APIRouter()


@router.post("/api/tell_us_anything", response_model=Tell_us_anythingOut)
def create_submission(
    tell_us_anything: Tell_us_anythingIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends(),
):
    return repo.create_tell_us_anything(
        tell_us_anything=tell_us_anything, user_id=account_data["id"]
    )


@router.get("/api/tell_us_anything/me", response_model=Tell_us_anythingList)
def get_my_submissions(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends(),
):
    return {
        "submission": repo.get_my_tell_us_anything(user_id=account_data["id"])
    }


@router.get("/api/tell_us_anything", response_model=Tell_us_anythingList)
def get_all_submissions(
    repo: TellRepo = Depends(),
):
    return {"submission": repo.get_all_tell_us_anything()}


@router.delete("/api/tell_us_anything", response_model=DeleteStatus)
def delete_submission(
    id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TellRepo = Depends(),
) -> bool:
    return {
        "success": repo.delete_tell_us_anything(
            id=id, user_id=int(account_data["id"])
        )
    }
