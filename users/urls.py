from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView, UserEducationListAPIView, UserExperienceListAPIView, UserContactListAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
    path("login/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    path('users/education/', UserEducationListAPIView.as_view(), name='user-education-list'),
    path('users/experience/', UserExperienceListAPIView.as_view(), name='user-experience-list'),
    path('users/contacts/', UserContactListAPIView.as_view(), name='user-contact-list'),
]