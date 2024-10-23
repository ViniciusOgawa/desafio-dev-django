from django.db import models


class Education(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='educations')
    institution = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    ongoing = models.BooleanField(default=False)
    period = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.username} - {self.course} at {self.institution}"
