from rest_framework import serializers
from .models import Education
from users.serializers import UserSerializer


class EducationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = Education
        fields = ['id', 'user', 'institution', 'course', 'period', 'ongoing']

    def create(self, validated_data):
        user = self.context['request'].user
        return Education.objects.create(user=user, **validated_data)