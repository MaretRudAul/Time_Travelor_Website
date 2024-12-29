from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class SecureToken(models.Model):
    token = models.CharField(max_length=60)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.token} - {self.created_at}"


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password):
        if not username:
            raise ValueError('Users must have a username.')
        if not password:
            raise ValueError('Users must have a password.')
        user = self.model(username=username)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=32)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # Additional fields can be added here

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'