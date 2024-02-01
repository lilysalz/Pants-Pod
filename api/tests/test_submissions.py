from fastapi.testclient import TestClient
from main import app
from models import Tell_us_anythingOut
from queries.tell_us_anything import TellRepo
from authenticator import authenticator

# Init TestClient with FastAPI app
client = TestClient(app)


class MockTellRepo:
    """
    mocked version of TellRepo

    """

    def get_my_tell_us_anything(self, user_id: str):
        return [
            Tell_us_anythingOut(
                id=1,
                user_id=1,
                submission_text=1,
                submission_datetime=2024 / 1 / 19,
            ),
            Tell_us_anythingOut(
                id=1,
                user_id=1,
                submission_text=1,
                submission_datetime=2024 / 1 / 19,
            ),
        ]


def fake_get_current_account_data():
    return {"id": 1, "username": "user1"}


def test_get_submission():
    """
    test the get submissions endpoint
    """
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[TellRepo] = MockTellRepo

    # Act
    response = client.get("/api/tell_us_anything/me")

    # Assert
    assert response.status_code == 200

    # Clean up
    app.dependency_overrides = {}
