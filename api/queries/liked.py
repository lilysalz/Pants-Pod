from queries.pool import pool
from models import LikedIn, LikedOut


class LikedRepository:
    def create_liked_episode(self, liked_in: LikedIn, user_id: str):
        liked = liked_in.dict()
        liked["user_id"] = user_id
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO liked_episodes (
                            episode_id,
                            user_id
                            )
                        SELECT CAST(%(episode_id)s AS VARCHAR), %(user_id)s
                        WHERE NOT EXISTS (
                            SELECT 1
                            FROM liked_episodes
                            WHERE episode_id = %(episode_id)s
                            AND user_id = %(user_id)s
                        )
                        RETURNING id;
                        """,
                        liked,
                    )
                    get_result = result.fetchone()
                    if get_result:
                        liked["id"] = str(get_result[0])
                        return liked
                    else:
                        return {"message": "Like record already exists."}
        except Exception:
            return {"message": "Couldn't like episode."}

    def get_liked_episodes(self, user_id: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, episode_id, user_id
                        FROM liked_episodes
                        WHERE user_id = %s;
                        """,
                        [user_id],
                    )
                    results = []
                    for record in db:
                        record = LikedOut(
                            id=record[0],
                            episode_id=record[1],
                            user_id=record[2],
                        )
                        results.append(record)
                    return results
        except Exception:
            return {"message": "Couldn't get a list of liked episodes"}

    def delete_liked_episode(self, episode_id: str, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM liked_episodes
                        WHERE episode_id = %s AND user_id = %s
                        RETURNING episode_id
                        """,
                        (episode_id, user_id),
                    )
                    result = db.fetchone()[0]
                    return result is not None
        except Exception:
            return False
