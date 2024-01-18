from pydantic import BaseModel
from fastapi import HTTPException
from typing import Union, List, Optional
from datetime import date
from queries.pool import pool
from psycopg.types.json import Json
import os
import httpx
import base64


class Error(BaseModel):
    message: str


class SpotifyPodcast(BaseModel):
    podcast_id: str
    title: str
    description: str
    duration: int
    release_date: date
    url: str


class ApplePodcast(BaseModel):
    podcast_id: str
    title: str
    release_date: date
    url: str


class PodcastEpisode(BaseModel):
    id: int
    spotify_id: Optional[str]
    apple_id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    duration: Optional[int]
    release_date: Optional[date]
    spotify_url: Optional[str]
    apple_url: Optional[str]


class EpisodesRepository:
    def get_all_episodes(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, spotify_id, apple_id, title, description, duration, release_date, spotify_url, apple_url
                        FROM episodes
                        ORDER BY release_date;
                        """
                    )
                    result = []
                    for record in db:
                        record = PodcastEpisode(
                            id=record[0],
                            spotify_id=record[1],
                            apple_id=record[2],
                            title=record[3],
                            description=record[4],
                            duration=record[5],
                            release_date=record[6],
                            spotify_url=record[7],
                            apple_url=record[8],
                        )
                        result.append(record)
                    return result
        except Exception as e:
            print(e)
            return {'message': 'Couldn\'t get a list of episodes'}
