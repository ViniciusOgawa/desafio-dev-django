from django.db import models


class Contact(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='contacts')
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    number = models.CharField(max_length=10)
    neighborhood = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.username} - {self.phone_number}"