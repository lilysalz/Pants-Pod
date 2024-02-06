# PANTS - The Web App

**Team:**

-   Lily Salzman
-   Omari Thomas
-   Noah Bowman

## Welcome To The Show
[Leisha Hailey](https://www.instagram.com/leishahailey/?hl=en) and [Katherine Moennig](https://www.instagram.com/kateomoennig/?hl=en) met almost twenty years ago, playing best friends on TV. They’re still playing best friends, on TV, in the real world, and now online.

[TOC]

## What It Is

The Pants Podcast Web App boasts a powerful RESTful API designed to enhance the fan experience for lovers of the Pants podcast. Tailored for pockets – devoted fans of Pants – the API seamlessly facilitates CRUD operations, allowing users to interact with the hosts and each other effortlessly. We've integrated two third-party APIs (Spotify and Apple) into a unified platform, offering a user-friendly interface for an immersive fan engagement. The user authentication process not only ensures security but also elevates registered users' accessibility and interactivity with both information and hosts.

## What You'll Do

-   **Listening and Learning:** Any user can easily listen to or learn about each episode, creating a seamless experience for podcast enthusiasts.
-   **Search and Sort:** Pockets can effortlessly search and sort through all episodes, making it a breeze to find and enjoy their desired content.
-   **Personalized Experience:** By logging in, pockets can unlock the ability to save specific episodes by liking them. This personal touch empowers users to curate a customizable page dedicated to their favorite episodes.

## Who It's For

The Pants Web App is currently tailored for the vibrant community of Pants podcast fans, primarily comprised of queer people aged 25 to 50. As we evolve and incorporate stretch goal features, we envision expanding the app to become a versatile space for all members of the queer community and businesses to connect and interact. Inevitably, turning all people into pockets.

## How The Trip Is Going

- [x] Account Creation
  - [ ] OAUTH with Gmail/Apple/Facebook
  - [ ] Email Account Authentication
  - [ ] OTP Verification
- [x] Login/Logout
- [x] Home Page
- [x] Episodes List
  - [x] Episodes List with Favorites Function
  - [x] Favorite Episodes List
- [ ] Episode Detail Page
  - [ ] Episode User Notes(User Only)
  - [ ] Comment Section
    - [ ] Add Comments
    - [ ] Delete Comments
    - [ ] See All Account Comments
- [ ] Tell Us Anything Page
- [ ] News/Updates Page
- [ ] Event Upload Page
  - [ ] Patreon Type Integration for Promotion
- [ ] Admin Page
  - [ ] Tell Us Anything View
  - [ ] Tell Us Anything Sort
  - [ ] Podcast Data Management
  - [ ] User Management
    - [ ] Banning Users By IP
    - [ ] Comment Moderation

- **Tell Us Anything Page:** Implement a dedicated page where users can post messages for hosts to see. Administrators gain access to a list of all messages, sorted by date, ensuring seamless communication between fans and hosts.
- **Episode Details Page:** Enhance the user experience with detailed pages for each episode, including comprehensive information and a comments section for user interaction.
- **Additional User Features:** Explore providing users with additional features, such as the ability to take episode notes and more on the screen, further enriching the user experience.
- **Administrative Empowerment:** Strengthen administrative functions by enabling the banning of specific users for enhanced community management.
- **Patreon-Inspired Feature:** Introduce a Patreon-inspired feature, allowing users to pay for the privilege of uploading queer events to the app's map.
- **Event Discovery:** Enable users to input their zip code with a customizable range to receive a curated list of nearby events, fostering community engagement.
- **Comprehensive App Experience:** Transform the concept into a fully-fledged app, complete with a Discord channel for seamless communication.
- **Content Expansion:** Empower administrators to publish articles, enhancing the platform's content diversity.
- **Authentication Upgrade:** Consider upgrading the authentication process with Google OAuth for a streamlined and secure login experience.


## Onboarding

**Prerequisites:**
- Docker
- Git
- Node.js

1. Fork the specified repository

2. Clone the forked repository onto your local computer:

3. Create .env file at the top level

```
CLIENT_ID=...[Get from spotify: https://developer.spotify.com/dashboard]
CLIENT_SECRET=...[Get from spotify: https://developer.spotify.com/dashboard]
SIGNING_KEY=...[Make your own]
PG_DEFAULT_EMAIL=...[Make your own]
PG_DEFAULT_PASS=...[Make your own]
VITE_API_HOST=http://localhost:8000

```
4. Create another .env file in ghi that contains this:
```
VITE_API_HOST=http://localhost:8000
```

5. Build and run the project using Docker with the following commands in your terminal:

```
docker volume create postgres-data
docker volume create pg-admin
docker-compose build
docker-compose up
```

6. After running these commands, make sure all of your Docker containers are running. You should have one for postgres, one for fastapi, one for ghi, and one for pg-admin.

7. View the project in the browser: http://localhost:5173/

## Tech Stack

- React
- FastAPI
- PostgreSQL
- Docker

This project utilizes FastAPI, a modern web framework for building RESTful APIs in Python. Comprising Pydantic, Starlette, and Unicorn, FastAPI offers flexibility in choosing databases. PostgreSQL is the selected database, requiring the creation of migrations tables with a specific format. The FastAPI portion of this project is structured with dedicated directories for migrations, queries, routers, and tests. The migrations directory holds the format for setting up our database, while the queries directory houses repositories for the necessary code to gather data. The routers directory attaches these codes to specific paths.

#### Pydantic:

- Utilizes type hints to validate, serialize, and deserialize data.
- Automatically generates OpenAPI documentation for APIs built with it.
- A data validation library from Python, written in the Rust programming language.

#### Starlette:

- A lightweight ASGI framework/toolkit supporting async functionality in Python.
  - **ASGI (Asynchronous Server Gateway Interface):**
    - A calling convention for web servers to forward requests to asynchronous-capable Python programming language frameworks and applications.

#### Uvicorn:

- A minimal low-level server/application web server for asynchronous frameworks that follows the ASGI specification.

## Journaling

Each team member maintains a journal in the journals directory

## Documentation

View the docs folder for comprehensive project documentation.

## Issue Tracking

Visit https://gitlab.com/un-pantalon/pants/-/issues

## Testing

-   Our unit tests test the endpoints for getting comments, liked episodes, and submissions to the tell us anything API. In order to run the tests follow the steps below:
1. Create a new virtual environment by typing `python -m venv .venv` into your terminal.
2. Activate the virtual environment by adding one of the options below:
    - windows: `.\.venv\Scripts\Activate.ps1`
    - macOS: `source ./.venv/bin/activate`
3. Update pip by entering: `python -m pip install --upgrade pip`
4. Still in your terminal, enter `pip install pytest`
5. Make sure your docker containers are up and running
6. In your terminal, enter `docker ps` to get the container IDs
7. Get the fastapi container's ID and enter the following into your terminal: `docker exec {fastapi container ID} python -m pytest`


You should get a response that looks like this:

```
============================= test session starts ==============================
platform linux -- Python 3.10.13, pytest-7.4.4, pluggy-1.3.0
rootdir: /app
plugins: anyio-3.7.1
collected 3 items
tests/test_liked.py .                                                    [100%]
============================== 1 passed in 0.56s ===============================
```

-   Lily Salzman made the liked episodes unit test: api/tests/test_liked.py. The test passes if we are able to get a users liked episodes with no errors. It has a fake database of liked episodes for a user and passes when the status code is 200, the length of the response is equivalent to the amount of liked episodes in our mock database, and the liked episodes match that database exactly.
 -  Noah Bowman made the test comments unit text in 'api/tests/test_comments.py'.  It creates uses the FastAPI code to get provided test comment data, based on a provided test user.

## API Documentation

Visit swagger: http://localhost:8000/docs#/ to access the following endpoints.

#### Episodes
| Action | Method | Path
| ----------- | ----------- | ----------- |
| Get all episodes | GET | /api/episodes

#### Admin
| Action | Method | Path
| ----------- | ----------- | ----------- |
| Get podcast data | POST | /api/episodes/admin/get_podcast_data
| Clear episode database | DELETE | /api/episodes/admin/clear_podcast_data

#### Accounts
<table>
    <thead>
        <tr>
            <th>
                Action
            </th>
            <th>
                Method
            </th>
            <th>
                Path
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Get Token</td>
            <td>GET</td>
            <td>/token</td>
        </tr>
        <tr>
            <td>Create Account</td>
            <td>POST</td>
            <td>/api/accounts</td>
        </tr>
        <tr>
            <td colspan="3">
            Expects:

```json
{
  "username": "string",
  "password": "string"
}
```

</td>
        </tr>
    </tbody>
</table>

#### Auth
<table>
    <thead>
        <tr>
            <th>
                Action
            </th>
            <th>
                Method
            </th>
            <th>
                Path
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Login</td>
            <td>POST</td>
            <td>/token</td>
        </tr>
        <tr>
          <td>Logout</td>
          <td>DELETE</td>
          <td>/token</td>
        </tr>
    </tbody>
</table>

#### Liked Episodes
<table>
    <thead>
        <tr>
            <th>
                Action
            </th>
            <th>
                Method
            </th>
            <th>
                Path
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Get liked episodes for user</td>
            <td>GET</td>
            <td>/api/episodes/liked/me</td>
        </tr>
        <tr>
            <td>Create liked episode record</td>
            <td>POST</td>
            <td>/api/episodes/liked/me</td>
        </tr>
        <tr>
            <td colspan="3">
            Expects:

```json
{
  "episode_id": "string"
}
```

</td>
        </tr>
        <tr>
          <td>Delete a liked episodes</td>
          <td>DELETE</td>
          <td>/api/episodes/liked/me</td>
        </tr>
    </tbody>
</table>

#### Comments
<table>
    <thead>
        <tr>
            <th>
                Action
            </th>
            <th>
                Method
            </th>
            <th>
                Path
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Get all episode comments</td>
            <td>GET</td>
            <td>/api/episodes/comments/{episode_id}</td>
        </tr>
        <tr>
            <td>Create a comment</td>
            <td>POST</td>
            <td>/api/episodes/comments/{episode_id}</td>
        </tr>
        <tr>
            <td colspan="3">
            Expects:

```json
{
  "episode_id": "string",
  "comment_text": "string",
  "comment_datetime": "2024-02-06"
}
```

</td>
        </tr>
        <tr>
          <td>Delete a liked episodes</td>
          <td>DELETE</td>
          <td>/api/episodes/liked/me</td>
        </tr>
    </tbody>
</table>

#### Submissions
<table>
    <thead>
        <tr>
            <th>
                Action
            </th>
            <th>
                Method
            </th>
            <th>
                Path
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Get all submissions</td>
            <td>GET</td>
            <td>/api/tell_us_anything</td>
        </tr>
        <tr>
            <td>Create a submission</td>
            <td>POST</td>
            <td>/api/tell_us_anything</td>
        </tr>
        <tr>
            <td colspan="3">
            Expects:

```json
{
  "submission_text": "string",
  "submission_datetime": "2024-02-06"
}
```

</td>
        </tr>
        <tr>
          <td>Delete a submission</td>
          <td>DELETE</td>
          <td>/api/tell_us_anything</td>
        </tr>
        <tr>
          <td>Get user's submissions</td>
          <td>GET</td>
          <td>/api/tell_us_anything/me</td>
        </tr>
    </tbody>
</table>
