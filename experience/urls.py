from django.urls import path
from .views import ExperienceListCreateAPIView, ExperienceRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('experience/', ExperienceListCreateAPIView.as_view(), name='experience-list-create'),
    path('experience/<int:pk>/', ExperienceRetrieveUpdateDestroyAPIView.as_view(), name='experience-retrieve-update-destroy'),
]