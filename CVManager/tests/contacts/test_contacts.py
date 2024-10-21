import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from contacts.models import Contact
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
def create_contact(db, create_user):
    def _create_contact(user, phone_number="1234567890", city="Sample City", state="Sample State", street="Sample Street", number="123", neighborhood="Sample Neighborhood", postal_code="12345"):
        return Contact.objects.create(
            user=user,
            phone_number=phone_number,
            city=city,
            state=state,
            street=street,
            number=number,
            neighborhood=neighborhood,
            postal_code=postal_code
        )
    return _create_contact

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
def test_contact_creation(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-list-create')
    contact_data = {
        "phone_number": "1234567890",
        "city": "Sample City",
        "state": "Sample State",
        "street": "Sample Street",
        "number": "123",
        "neighborhood": "Sample Neighborhood",
        "postal_code": "12345",
    }
    response = api_client.post(url, contact_data)
    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}. Response data: {response.data}"
    assert Contact.objects.filter(user=user).exists()

@pytest.mark.django_db
def test_contact_retrieve(api_client, create_user, create_contact, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    contact = create_contact(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['phone_number'] == "1234567890"

@pytest.mark.django_db
def test_contact_update(api_client, create_user, create_contact, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    contact = create_contact(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    update_data = {"city": "Updated City"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 200
    contact.refresh_from_db()
    assert contact.city == "Updated City"

@pytest.mark.django_db
def test_contact_delete(api_client, create_user, create_contact, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    contact = create_contact(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    response = api_client.delete(url)
    assert response.status_code == 204
    assert not Contact.objects.filter(id=contact.id).exists()

@pytest.mark.django_db
def test_contact_creation_failure_duplicate(api_client, create_user, create_contact, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    create_contact(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-list-create')
    contact_data = {
        "phone_number": "0987654321",
        "city": "New City",
        "state": "New State",
        "street": "New Street",
        "number": "456",
        "neighborhood": "New Neighborhood",
        "postal_code": "67890",
    }
    response = api_client.post(url, contact_data)
    assert response.status_code == 400
    assert "This user already has a registered contact." in response.data['non_field_errors']

@pytest.mark.django_db
def test_contact_update_failure_not_owner(api_client, create_user, create_contact, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    contact = create_contact(user=user1)
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    update_data = {"city": "Unauthorized Update"}
    response = api_client.patch(url, update_data)
    assert response.status_code == 403

@pytest.mark.django_db
def test_contact_delete_failure_not_owner(api_client, create_user, create_contact, get_tokens_for_user):
    user1 = create_user("testuser1", "testuser1@example.com", "testpassword1")
    user2 = create_user("testuser2", "testuser2@example.com", "testpassword2")
    contact = create_contact(user=user1)
    tokens = get_tokens_for_user(user2)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    response = api_client.delete(url)
    assert response.status_code == 403

@pytest.mark.django_db
def test_contact_creation_failure_invalid_data(api_client, create_user, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-list-create')
    contact_data = {
        "phone_number": "invalid-phone",
        "city": "",
        "state": "Sample State",
        "street": "Sample Street",
        "number": "abc",
        "neighborhood": "Sample Neighborhood",
        "postal_code": "invalid-postal-code",
    }
    response = api_client.post(url, contact_data)
    assert response.status_code == 400
    assert "city" in response.data

@pytest.mark.django_db
def test_contact_update_failure_invalid_data(api_client, create_user, create_contact, get_tokens_for_user):
    user = create_user("testuser", "testuser@example.com", "testpassword")
    contact = create_contact(user=user)
    tokens = get_tokens_for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    url = reverse('contact-retrieve-update-destroy', kwargs={'pk': contact.id})
    update_data = {
        "phone_number": "invalid-phone",
        "city": "",
        "number": "abc",
        "postal_code": "invalid-postal-code",
    }
    response = api_client.patch(url, update_data)
    assert response.status_code == 400
    assert "city" in response.data

