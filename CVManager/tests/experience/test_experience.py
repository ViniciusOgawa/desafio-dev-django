import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from experience.models import Experience
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
def create_experience(db, create_user):
    def _create_experience(user, role="Software Developer", company="Sample Company", period="2020-2021", description="Worked on various projects"):
        return Experience.objects.create(
            user=user,
            role=role,
            company=company,
            period=period,
            description=description
        )
    return _create_experience

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
def test_experience_creation(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-list-create')
    experience_data = {
        "role": "Software Engineer",
        "company": "Tech Corp",
        "period": "2021-2022",
        "description": "Developed new features."
    }
    response = api_client.post(url, experience_data)
    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}. Response data: {response.data}"
    assert Experience.objects.filter(user=user).exists()

@pytest.mark.django_db
def test_experience_retrieve(api_client, create_user, create_experience, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    experience = create_experience(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['role'] == "Software Developer"

@pytest.mark.django_db
def test_experience_update(api_client, create_user, create_experience, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    experience = create_experience(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    update_data = {"company": "Updated Company"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 200
    experience.refresh_from_db()
    assert experience.company == "Updated Company"

@pytest.mark.django_db
def test_experience_delete(api_client, create_user, create_experience, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    experience = create_experience(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    response = api_client.delete(url)
    assert response.status_code == 204
    assert not Experience.objects.filter(id=experience.id).exists()

@pytest.mark.django_db
def test_experience_creation_failure_invalid_data(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-list-create')
    experience_data = {
        "role": "",
        "company": "Tech Corp",
        "period": "",
        "description": ""
    }
    response = api_client.post(url, experience_data)
    assert response.status_code == 400
    assert "role" in response.data 
    assert "period" in response.data

@pytest.mark.django_db
def test_experience_update_failure_not_owner(api_client, create_user, create_experience, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    experience = create_experience(user=user1)
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    update_data = {"company": "Unauthorized Update"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 403

@pytest.mark.django_db
def test_experience_delete_failure_not_owner(api_client, create_user, create_experience, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    experience = create_experience(user=user1)
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    response = api_client.delete(url)
    assert response.status_code == 403

@pytest.mark.django_db
def test_experience_update_failure_invalid_data(api_client, create_user, create_experience, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    experience = create_experience(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('experience-retrieve-update-destroy', kwargs={'pk': experience.id})
    update_data = {
        "role": "",
        "company": "",
        "period": "2021 to 2022"
    }
    response = api_client.patch(url, update_data)
    assert response.status_code == 400
    assert "role" in response.data
    assert "company" in response.data
    assert "period" not in response.data

