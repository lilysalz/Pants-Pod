from queries.pool import pool
from models import CommentsIn, CommentsOut, EpisodeCommentsOut


class CommentsRepo:
    def create_comments(self, comments: CommentsIn, user_id: str):
        comments = comments.dict()
        comments['user_id'] = user_id
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comments (
                            episode_id,
                            user_id,
                            comment_text,
                            comment_datetime
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comments['episode_id'],
                            comments['user_id'],
                            comments['comment_text'],
                            comments['comment_datetime']
                        ]
                    )
                    get_result = result.fetchone()
                    comments['id'] = str(get_result[0])
                    return comments
        except Exception as e:
            print(e)
            return {'message': 'Couldn\'t create comment.'}

    def get_comments(self, user_id: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, episode_id, user_id, comment_text, comment_datetime
                        FROM comments
                        WHERE user_id = %s;
                        """,
                        [user_id]
                    )
                    results = []
                    for record in db:
                        record = CommentsOut(
                            id=record[0],
                            episode_id=record[1],
                            user_id=record[2],
                            comment_text=record[3],
                            comment_datetime=record[4]
                        )
                        results.append(record)
                    return results
        except Exception:
            return {'message': 'Couldn\'t get a list of comments'}

    def get_episode_comments(self, episode_id: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_id, comment_text, comment_datetime
                        FROM comments
                        WHERE episode_id = %s;
                        """,
                        [episode_id]
                    )
                    results = []
                    for record in db:
                        record = EpisodeCommentsOut(
                            user_id=record[0],
                            comment_text=record[1],
                            comment_datetime=record[2]
                        )
                        results.append(record)
                    return results
        except Exception as e:
            print(e)
            return {'message': 'Couldn\'t get a list of comments'}

    def delete_comments(self, episode_id: str, user_id: int, id: str) ->bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE episode_id = %s
                        AND user_id = %s
                        AND id = %s
                        RETURNING episode_id
                        """,
                        (episode_id, user_id, id)
                    )
                    result = db.fetchone()[0]
                    return result is not None
        except Exception as e:
            print(e)
            return False
