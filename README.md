## Module3 Project Gamma

Team:

-   Omari Thomas
-   Noah Bowman
-   Lily Salzman

#MVP

## Getting Started

**Make sure you have Docker, Git, and Node.js**

1. Fork the specified repository

2. Clone the forked repository onto your local computer:

3. Update your docker compose file to include the services and volumes needed:

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

4. Update your requirements.txt file:

```
fastapi[all]<=0.92.0
uvicorn[standard]==0.17.6
pytest
psycopg[binary,pool]==3.1.2
httpx==0.26.0
aiofiles>=0.8.0,<0.9.0
jwtdown-fastapi>=0.5.0
```

5. Build and run the project using Docker with these commands:

```
docker volume create postgres-data
docker volume create pg-admin
docker-compose up
```

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
