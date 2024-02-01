from fastapi import APIRouter, Depends
from queries.admin import ThirdPartyRepository

router = APIRouter()


@router.post("/api/episodes/admin/get_podcast_data")
async def get_podcast_data(
    repo: ThirdPartyRepository = Depends(),
):
    result = await repo.get_podcast_data()
    return result


@router.delete("/api/episodes/admin/clear_episode_data")
def clear_database(
    repo: ThirdPartyRepository = Depends(),
):
    return repo.clear_podcast_database()
