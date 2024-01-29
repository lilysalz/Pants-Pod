from fastapi.testclient import TestClient
from main import app
from models import CommentsOut
from queries.comments import CommentsRepo
from authenticator import authenticator

# Init TestClient with FastAPI app
client = TestClient(app)


class MockCommentsRepo:
    """
    mocked version of CommentsRepo

    """

    def  get_episode_comments(self, episode_id: str):
        return [
            CommentsOut(
                episode_id=episode_id,
                id=1,
                user_id=1,
                comment_text=1,
                comment_datetime=2024/1/19
                ),
            CommentsOut(
                episode_id=episode_id,
                id=1,
                user_id=1,
                comment_text=1,
                comment_datetime=2024/1/19
                ),
        ]


def fake_get_current_account_data():
    return {"id": 1, "username": "user1"}


def test_get_comment():
    """
    test the get episode comments endpoint
    """
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[CommentsRepo
    ] = MockCommentsRepo


    # Act
    response = client.get("/api/episodes/comments/{episode_id}")

    # Assert
    assert response.status_code == 200


    # Clean up
    app.dependency_overrides = {}
