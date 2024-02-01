from fastapi import APIRouter, Depends
from queries.episodes import EpisodesRepository

router = APIRouter()


@router.get("/api/episodes")
def get_all_episodes(
    repo: EpisodesRepository = Depends(),
):
    return repo.get_all_episodes()
