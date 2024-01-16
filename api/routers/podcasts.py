from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union, Optional
from queries.episodes import(
    Error,
    EpisodesRepository
)

router = APIRouter()


@router.get("/api/episodes")
def get_all_episodes(
    repo: EpisodesRepository = Depends(),
):
    return repo.get_all_episodes()
