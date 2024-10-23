from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with that username already exists.",
            )
        ],
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(
                queryset=User.objects.all(),
                message="A user with that email already exists.",
            )],
    )
    password = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(input_formats=['%d/%m/%Y'])

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_of_birth', 'password', 'is_superuser']

    def update(self, instance: User, validated_data: dict) -> User:
        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()

        return instance

    def create(self, validated_data: dict) -> User:
        password = validated_data.pop('password', None)
        is_superuser = validated_data.pop('is_superuser', False)
    
        if is_superuser:
            user = User.objects.create_superuser(**validated_data)
        else:
            user = User(**validated_data)
    
        if password:
            user.set_password(password)
        
        user.save()

        return user
