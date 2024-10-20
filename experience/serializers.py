from rest_framework import serializers
from .models import Experience
from users.serializers import UserSerializer


class ExperienceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = Experience
        fields = ['id', 'user', 'role', 'company', 'period', 'description']

    def create(self, validated_data):
        user = self.context['request'].user
        return Experience.objects.create(user=user, **validated_data)