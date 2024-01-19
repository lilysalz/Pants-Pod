from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from models import(
    LikedIn
)


class LikedRepository:
    def create_liked_episode(self, liked_in: LikedIn, user_id: str):
        liked = liked_in.dict()
        liked['user_id'] = user_id
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO liked_episodes (
                            episode_id,
                            user_id
                            )
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        [liked['episode_id'], liked['user_id']]
                    )
                    get_result = result.fetchone()
                    liked['id'] = str(get_result[0])
                    return liked
        except Exception as e:
            print(e)
            return {'message': 'Couldn\'t like episode.'}

    def get_liked_episodes():
        pass

    def delete_liked_episode():
        pass
