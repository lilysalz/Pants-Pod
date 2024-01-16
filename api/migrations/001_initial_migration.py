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
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE big_dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE big_dummy;
        """
    ]
]
