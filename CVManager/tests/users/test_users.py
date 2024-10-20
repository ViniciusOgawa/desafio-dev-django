import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from users.models import User

@pytest.fixture
def create_user(db):
    def _create_user(username, email, password, date_of_birth="1990-01-01", is_admin=False):
        return User.objects.create_user(
            username=username,
            email=email,
            password=password,
            date_of_birth=date_of_birth,
            is_admin=is_admin
        )
    return _create_user

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def get_tokens_for_user():
    def _get_tokens(user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    return _get_tokens

@pytest.mark.django_db
def test_user_creation(api_client):
    url = reverse('user-list-create')
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword",
        "date_of_birth": "01/01/1990",
    }
    response = api_client.post(url, user_data)
    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}. Response data: {response.data}"
    assert User.objects.filter(username="testuser").exists()

@pytest.mark.django_db
def test_user_retrieve(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['username'] == "testuser"

@pytest.mark.django_db
def test_user_update(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    update_data = {"first_name": "UpdatedName"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.first_name == "UpdatedName"

@pytest.mark.django_db
def test_user_delete(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    response = api_client.delete(url)
    assert response.status_code == 204
    assert not User.objects.filter(username="testuser").exists()

@pytest.mark.django_db
def test_user_creation_failure_duplicate_username(api_client, create_user):
    create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-list-create')
    user_data = {
        "username": "testuser",
        "email": "newemail@example.com",
        "password": "testpassword",
        "date_of_birth": "1990-01-01",
    }
    response = api_client.post(url, user_data)
    assert response.status_code == 400
    assert "username" in response.data

@pytest.mark.django_db
def test_user_creation_failure_duplicate_email(api_client, create_user):
    create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-list-create')
    user_data = {
        "username": "newuser",
        "email": "testuser@example.com",
        "password": "testpassword",
        "date_of_birth": "1990-01-01",
    }
    response = api_client.post(url, user_data)
    assert response.status_code == 400
    assert "email" in response.data

@pytest.mark.django_db
def test_user_update_failure_unauthenticated(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    update_data = {"first_name": "UpdatedName"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 401

@pytest.mark.django_db
def test_user_delete_failure_unauthenticated(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    response = api_client.delete(url)
    assert response.status_code == 401

@pytest.mark.django_db
def test_user_update_failure_not_owner(api_client, create_user, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user1.id})
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    update_data = {"first_name": "UpdatedByAnotherUser"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 403

@pytest.mark.django_db
def test_user_delete_failure_not_owner(api_client, create_user, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user1.id})
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    response = api_client.delete(url)
    assert response.status_code == 403

@pytest.mark.django_db
def test_user_creation_failure_invalid_data(api_client):
    url = reverse('user-list-create')
    user_data = {
        "username": "newuser",
        "email": "not-an-email",
        "password": "testpassword",
        "date_of_birth": "invalid-date",
    }
    response = api_client.post(url, user_data)
    assert response.status_code == 400
    assert "email" in response.data
    assert "date_of_birth" in response.data

@pytest.mark.django_db
def test_user_update_failure_invalid_data(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    url = reverse('user-retrieve-update-destroy', kwargs={'pk': user.id})
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    update_data = {
        "email": "not-an-email",
    }
    response = api_client.patch(url, update_data)
    assert response.status_code == 400
    assert "email" in response.data
