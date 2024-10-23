from django.db import models

class Experience(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='experiences')
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    period = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.role} at {self.company}"
