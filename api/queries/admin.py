from pydantic import BaseModel
from fastapi import HTTPException
from queries.pool import pool
from psycopg.types.json import Json
import os
import httpx
import base64


class Error(BaseModel):
    message: str


class ThirdPartyRepository:
    async def get_podcast_data(
            self):  # -> Union[Error, List[SpotifyPodcast]]:
        response1 = await self.get_initial_spotify_data()
        response2 = await self.get_initial_apple_data()
        return response1, response2

    async def get_initial_spotify_data(
            self,
            api_url="https://api.spotify.com/v1/shows/2fB0mLyJDGBFUUyRQTXb9O/episodes?offset=0&limit=50&market=US&locale=en-US,en;q=0.5"
    ):
        CLIENT_ID = os.environ["CLIENT_ID"]
        CLIENT_SECRET = os.environ["CLIENT_SECRET"]
        # Getting the access token from Spotify
        async with httpx.AsyncClient() as client:
            auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
            auth_b64 = base64.b64encode(auth_str.encode()).decode()
            token_url = "https://accounts.spotify.com/api/token"
            token_body = {"grant_type": "client_credentials"}
            token_headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {auth_b64}",
            }
            try:
                token_response = await client.post(
                    token_url,
                    data=token_body,
                    headers=token_headers
                    )
                if token_response.status_code != 200:
                    raise HTTPException(
                        status_code=token_response.status_code,
                        detail="Failed to fetch token"
                        )
                token_data = token_response.json()
                access_token = token_data.get("access_token")
                # Using the access token to get track info
                if access_token:
                    track_info_url = api_url
                    track_info_headers = {"Authorization": f"Bearer {access_token}"}
                    track_info_response = await client.get(
                        track_info_url,
                        headers=track_info_headers
                        )
                    if track_info_response.status_code != 200:
                        raise HTTPException(
                            status_code=track_info_response.status_code,
                            detail="Failed to fetch track info"
                            )
                    track_info = track_info_response.json()
                    episode_info = track_info["items"]
                    try:
                        with pool.connection() as conn:
                            with conn.cursor() as db:
                                db.execute(
                                    """
                                    INSERT INTO episodes (
                                        spotify_id,
                                        title,
                                        description,
                                        duration,
                                        release_date,
                                        spotify_url
                                        )
                                    SELECT (data ->> 'id')::varchar(100) as spotify_id,
                                        (data ->> 'name')::varchar(1000) as title,
                                        (data ->> 'description')::text as description,
                                        (data ->> 'duration_ms')::integer as duration,
                                        (data ->> 'release_date')::date as release_date,
                                        (data -> 'external_urls' ->> 'spotify')::text as spotify_url
                                    FROM json_array_elements(%s::json) AS item(data)
                                    ON CONFLICT (spotify_id)
                                    DO NOTHING;
                                    """,
                                    [Json(episode_info)]
                                )
                        if track_info["next"]:
                            return await self.get_initial_spotify_data(api_url=track_info["next"])
                        else:
                            return {'message': 'Spotify API call successful. Please verify data integrity.'}
                    except Exception as e:
                        print(e)
                        return {'message': 'Couldn\'t write spotify data to DB.'}
            except Exception as e:
                print(e)
                return {'message': 'Something went wrong with Spotify API call'}

    async def get_initial_apple_data(
        self,
        api_url="https://itunes.apple.com/lookup?id=1514861303&country=US&media=podcast&entity=podcastEpisode&limit=10000"
    ):
        try:
            track_info_response = httpx.get(api_url)
            if track_info_response.status_code != 200:
                raise HTTPException(
                    status_code=track_info_response.status_code,
                    detail="Failed to fetch track info"
                    )
            track_info = track_info_response.json()
            track_info = track_info["results"]
            track_info.pop(0)
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE episodes
                            SET (apple_id, apple_url) =
                            (
                                SELECT (data ->> 'episodeGuid')::varchar(100) as apple_id,
                                    (data ->> 'trackViewUrl')::text as apple_url
                            )
                            FROM json_array_elements(%s::json) AS item(data)
                            WHERE (episodes.release_date)::date = (data ->> 'releaseDate')::timestamp::date
                            """,
                            [Json(track_info)]
                        )
                        return {'message': 'Apple API call successful.  Please verify data integrity.'}
            except Exception as e:
                print(e)
                return {'message': 'Couldn\'t write apple data to DB'}
        except Exception as e:
            print(e)
            return {'message': 'Something went wrong with Apple api call'}

    def clear_podcast_database(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM episodes
                        """
                    )
                    return True
        except Exception as e:
            print(e)
            return {'message': 'Couldn\'t clear database'}
