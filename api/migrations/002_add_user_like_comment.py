steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) UNIQUE,
            password VARCHAR(100)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE liked_episodes (
            id SERIAL PRIMARY KEY NOT NULL,
            episode_id VARCHAR(100),
            user_id INT,
            FOREIGN KEY (episode_id) REFERENCES episodes(spotify_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE liked_episodes;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            episode_id VARCHAR(100),
            user_id INT,
            FOREIGN KEY (episode_id) REFERENCES episodes(spotify_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            comment_text TEXT,
            comment_datetime TIMESTAMP NOT NULL
                DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ],
    [
        """
        CREATE TABLE tell_me_anything (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            submission_text TEXT,
            submission_datetime TIMESTAMP NOT NULL
                DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tell_me_anything;
        """
    ]
]
