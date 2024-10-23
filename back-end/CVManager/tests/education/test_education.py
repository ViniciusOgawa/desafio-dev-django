import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from education.models import Education
from users.models import User


@pytest.fixture
def create_user(db):
    def _create_user(username, email, password, date_of_birth="1990-01-01", is_superuser=False):
        return User.objects.create_user(
            username=username,
            email=email,
            password=password,
            date_of_birth=date_of_birth,
            is_superuser=is_superuser
        )
    return _create_user


@pytest.fixture
def create_education(db, create_user):
    def _create_education(user, institution="Sample University", course="Computer Science", period="2015-2019", ongoing=False):
        return Education.objects.create(
            user=user,
            institution=institution,
            course=course,
            period=period,
            ongoing=ongoing
        )
    return _create_education


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
def test_education_creation(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('education-list-create')
    education_data = {
        "institution": "Tech University",
        "course": "Software Engineering",
        "period": "2018-2022",
        "ongoing": False
    }
    response = api_client.post(url, education_data)
    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}. Response data: {response.data}"
    assert Education.objects.filter(user=user).exists()


@pytest.mark.django_db
def test_education_retrieve(api_client, create_user, create_education, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    education = create_education(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('education-retrieve-update-destroy', kwargs={'pk': education.id})
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['institution'] == "Sample University"


@pytest.mark.django_db
def test_education_update(api_client, create_user, create_education, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    education = create_education(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('education-retrieve-update-destroy', kwargs={'pk': education.id})
    update_data = {"course": "Updated Course"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 200
    education.refresh_from_db()
    assert education.course == "Updated Course"


@pytest.mark.django_db
def test_education_delete(api_client, create_user, create_education, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    education = create_education(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('education-retrieve-update-destroy', kwargs={'pk': education.id})
    response = api_client.delete(url)
    assert response.status_code == 204
    assert not Education.objects.filter(id=education.id).exists()


@pytest.mark.django_db
def test_education_creation_failure_invalid_data(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('education-list-create')
    education_data = {
        "institution": "",
        "course": "Software Engineering",
        "period": "",
        "ongoing": False
    }
    response = api_client.post(url, education_data)
    assert response.status_code == 400
    assert "institution" in response.data
    assert "period" in response.data
