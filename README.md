## Module3 Project Gamma

Team:

-   Noah Bowman
-   Lily Salzman
-   Omari Thomas

#MVP

1. Functionality

-   Our RESTful API facilitates CRUD operations for managing podcast data. It seamlessly integrates two third-party APIs
    (Spotify and Apple) on a unified platform, providing a user-friendly interface for enhanced fan engagement. Furthermore,
    the user authentication process grants registered users increased accessibility and interactivity with both the information
    and the hosts.

2. User Scenarios

-   Once a user is logged in, they gain the ability to express appreciation for specific episodes by liking them. The liked
    episodes can subsequently be accessed on a dedicated page, where the user's saved episodes are stored.

3. Intended Market

-   (Clearly define your user persona and target demographic)

4. Stretch Goals

-   Enhance administrative functions by enabling the banning of specific users. Introduce a Patreon-inspired feature, allowing
    users to pay for the privilege of uploading events to the map. Users, in turn, can input their zip code with a customizable
    range to receive a curated list of nearby events. The goal is to transform this concept into an app, complete with a Discord
    channel. Additionally, empower administrators to publish articles. Consider upgrading the authentication process with Google
    OAuth and explore providing users with additional features, such as the ability to take episode notes and more on screen.

5. Onboarding
   **Make sure you have Docker, Git, and Node.js**

-1. Fork the specified repository

-2. Clone the forked repository onto your local computer:

-3. Update your docker compose file to include the services and volumes needed:

```
volumes:
    postgres-data:
        external: true
    pg-admin:
        external: true
services:
    postgres:
        ...
    fastapi:
        environment:
            ...
    ghi:
        ...
    pg-admin:
        image: dpage/pgadmin4
        volumes:
            ...
        ...
```

-4. Update your requirements.txt file:

```
fastapi[all]<=0.92.0
uvicorn[standard]==0.17.6
pytest
psycopg[binary,pool]==3.1.2
httpx==0.26.0
aiofiles>=0.8.0,<0.9.0
jwtdown-fastapi>=0.5.0
```

-4.5 Create .env file

```
CLIENT_ID=...
CLIENT_SECRET=...
SIGNING_KEY=...
PG_DEFAULT_EMAIL=...
PG_DEFAULT_PASS=...
VITE_API_HOST=...

```

-5. Build and run the project using Docker with these commands:

```
docker volume create postgres-data
docker volume create pg-admin
docker-compose up
```

6. Tech Stack

-   React, FastAPI, PostgreSQL, Docker

7. Journaling

-   Each team member maintains a journal in the journals directory

8. Documentation

-   view documents directory

9. Issue Tracking

10. Testing

-   Our unit tests test the endpoints for getting comments, liked episodes and submissions to the tell us anything API.

6. After running these commands, make sure all of your Docker containers are running

-   View the project in the browser: http://localhost:5173/

## API Documentation

HIGH LEVEL OVERVIEW

This project uses FastAPI. FastAPI is a modern web framwork for building RESTful APIs in Python. It is predominantly comprised of Pydantic, Starlette and Unicorn. FastAPI allows the versatility of choosing your database. The database used here is postgres, hence, the need for creating migrations table specifically formatted. The FastApi portion of this project has specific directories for migrations, queries, routers, and tests. As mentioned, the migrations directory holds the format we chose to set up or database. The queries directory houses the repositories for the necessary code to gather data while the routers directory attach those codes to a specific path.

Pydantic:
-Uses type hinst to validate, serialize and deserialize data. it also automatically generates OpenAPI docuentation for APIs built with it.
-Is a data validation library from Python, written in Rust programming language.

Starlette:
-Is a lightweight ASGI framework/toolkit used to support async functionality in Python.
(--)Asynchronous Server Gateway Interface (ASGI):
(---)is a calling convention for web servers to forward request to asynchroous-capable Python programming language frameworks and applications.

Uvicorn:
-Is a minimal low-lever server/applicatin web server for asynck frameworks that follows ASGI specification.
