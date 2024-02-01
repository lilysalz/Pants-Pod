# Import necessary modules
from fastapi.testclient import TestClient
from main import app
from models import LikedOut
from queries.liked import LikedRepository
from authenticator import authenticator

# Init TestClient with FastAPI app
client = TestClient(app)


class MockLikedRepository:
    """
    mocked version of LikedRepository
    """

    def get_liked_episodes(self, user_id: str):
        return [
            LikedOut(episode_id=1, id=1, user_id=1),
            LikedOut(episode_id=1, id=1, user_id=1),
        ]


def fake_get_current_account_data():
    return {"id": 1, "username": "user1"}


def test_get_liked():
    """
    test the get liked episodes endpoint
    """
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[LikedRepository] = MockLikedRepository

    # Act
    response = client.get("/api/episodes/liked/me")

    # Assert
    assert response.status_code == 200
    liked_eps = response.json()
    assert len(liked_eps["liked"]) == 2
    assert liked_eps == {
        "liked": [
            {"episode_id": "1", "id": "1", "user_id": "1"},
            {"episode_id": "1", "id": "1", "user_id": "1"},
        ]
    }

    # Clean up
    app.dependency_overrides = {}
