from django.db import models
from django.utils.timezone import now


class SecureToken(models.Model):
    token = models.CharField(max_length=60)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.token} - {self.created_at}"
