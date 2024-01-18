steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE episodes (
            id SERIAL PRIMARY KEY NOT NULL,
            spotify_id VARCHAR(100) UNIQUE,
            apple_id VARCHAR(100) UNIQUE,
            title VARCHAR(1000) UNIQUE,
            description TEXT,
            duration INT,
            release_date DATE,
            spotify_url TEXT,
            apple_url TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE episodes;
        """
    ]
]
