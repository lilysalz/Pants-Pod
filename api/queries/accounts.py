from models import AccountIn, AccountOutWithHashedPassword
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountsQueries:
    def get(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id, username, password
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    get_result = result.fetchone()
                    if get_result is None:
                        return get_result
                    account = {}
                    account["id"] = str(get_result[0])
                    account["username"] = str(get_result[1])
                    account["hashed_password"] = str(get_result[2])
                    return AccountOutWithHashedPassword(**account)
        except Exception as e:
            return {"message": "Couldn't get user info."}

    def create(self, info: AccountIn, hashed_password: str):
        if self.get(username=info.username) is not None:
            raise DuplicateAccountError
        account = info.dict()
        account["hashed_password"] = hashed_password
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (
                            username,
                            password
                            )
                        VALUES (%s, %s)
                        RETURNING user_id;
                        """,
                        [account["username"], account["hashed_password"]],
                    )
                    get_result = result.fetchone()
                    account["id"] = str(get_result[0])
                    return account
        except Exception as e:
            return {"message": "Couldn't create user."}
