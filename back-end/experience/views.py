from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Experience
from .serializers import ExperienceSerializer
from .permissions import IsAdminOrOwner


class ExperienceListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ExperienceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

