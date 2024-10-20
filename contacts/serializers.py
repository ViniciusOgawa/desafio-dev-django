from rest_framework import serializers
from .models import Contact
from users.serializers import UserSerializer


class ContactSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = ['id', 'user', 'phone_number', 'city', 'state', 'street', 'number', 'neighborhood', 'postal_code', 'user']

    def create(self, validated_data):
        user = self.context['request'].user
        return Contact.objects.create(user=user, **validated_data)

    def validate(self, data):
        request = self.context['request']
        user = request.user

        if request.method == 'POST':
            if Contact.objects.filter(user=user).exists():
                raise serializers.ValidationError("This user already has a registered contact.")
        
        return data