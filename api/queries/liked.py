from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from typing import Union
from models import (
    LikedIn,
    LikedList,
    LikedOut
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

    def get_liked_episodes(self, user_id: str):
        print("hi")
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, episode_id, user_id
                        FROM liked_episodes
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    results = []
                    for record in db:
                        #print(record)
                        record = LikedOut(
                            id=record[0],
                            episode_id=record[1],
                            user_id=record[2],
                        )
                        results.append(record)
                        print(results)
                    return results
                    # return [
                    #     LikedOut(
                    #         id=record[0],
                    #         episode_id=record[1],
                    #         user_id=record[2],
                    #     )
                    #     for record in db
                    # ]       
        except Exception:
            return {'message': 'Couldn\'t get a list of liked episodes'}

    def delete_liked_episode():
        pass
