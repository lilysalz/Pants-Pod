from queries.pool import pool
from models import Tell_us_anythingIn, Tell_us_anythingOut


class TellRepo:
    def create_tell_us_anything(
        self, tell_us_anything: Tell_us_anythingIn, user_id: str
    ):
        tell_us_anything = tell_us_anything.dict()
        tell_us_anything["user_id"] = user_id
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO tell_us_anything (
                            user_id,
                            submission_text,
                            submission_datetime
                        )
                        VALUES (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            tell_us_anything["user_id"],
                            tell_us_anything["submission_text"],
                            tell_us_anything["submission_datetime"],
                        ],
                    )
                    get_result = result.fetchone()
                    tell_us_anything["id"] = str(get_result[0])
                    return tell_us_anything
        except Exception:
            return {"message": "Couldn't create submission."}

    def get_my_tell_us_anything(self, user_id: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_id,
                        submission_text,
                        submission_datetime
                        FROM tell_us_anything
                        WHERE user_id = %s;
                        """,
                        [user_id],
                    )
                    results = []
                    for record in db:
                        record = Tell_us_anythingOut(
                            id=record[0],
                            user_id=record[1],
                            submission_text=record[2],
                            submission_datetime=record[3],
                        )
                        results.append(record)
                    return results
        except Exception:
            return {"message": "Couldn't get a list of submissions"}

    def get_all_tell_us_anything(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, user_id,
                        submission_text,
                        submission_datetime
                        FROM tell_us_anything
                        """,
                    )
                    results = []
                    for record in db:
                        record = Tell_us_anythingOut(
                            id=record[0],
                            user_id=record[1],
                            submission_text=record[2],
                            submission_datetime=record[3],
                        )
                        results.append(record)
                    return results
        except Exception:
            return {"message": "Couldn't get a list of submissions"}

    def delete_tell_us_anything(self, user_id: int, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM tell_us_anything
                        WHERE user_id = %s
                        AND id = %s
                        RETURNING id
                        """,
                        (user_id, id),
                    )
                    result = db.fetchone()[0]
                    return result is not None
        except Exception:
            return False
