steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE episodes (
            spotify_id VARCHAR(100) PRIMARY KEY,
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
        """,
    ]
]
