from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminOrOwner
from experience.serializers import ExperienceSerializer
from education.serializers import EducationSerializer
from contacts.serializers import ContactSerializer
from experience.models import Experience
from education.models import Education
from contacts.models import Contact


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserEducationListAPIView(generics.ListAPIView):
    serializer_class = EducationSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user).all()

class UserExperienceListAPIView(generics.ListAPIView):
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user).all()

class UserContactListAPIView(generics.ListAPIView):
    serializer_class = ContactSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.filter(user=self.request.user)

class UserMeAPIView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
