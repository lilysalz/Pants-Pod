from queries.pool import pool
from models import PodcastEpisode


class EpisodesRepository:
    def get_all_episodes(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT spotify_id, apple_id, title, description, duration, release_date, spotify_url, apple_url
                        FROM episodes
                        ORDER BY release_date;
                        """
                    )
                    result = []
                    for record in db:
                        record = PodcastEpisode(
                            spotify_id=record[0],
                            apple_id=record[1],
                            title=record[2],
                            description=record[3],
                            duration=record[4],
                            release_date=record[5],
                            spotify_url=record[6],
                            apple_url=record[7],
                        )
                        result.append(record)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Couldn't get a list of episodes"}
