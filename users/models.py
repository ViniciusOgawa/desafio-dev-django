from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username