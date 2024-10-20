from django.urls import path
from .views import EducationListCreateAPIView, EducationRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('education/', EducationListCreateAPIView.as_view(), name='education-list-create'),
    path('education/<int:pk>/', EducationRetrieveUpdateDestroyAPIView.as_view(), name='education-retrieve-update-destroy'),
]