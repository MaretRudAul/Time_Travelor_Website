import secrets
from .models import SecureToken

def generate_token():
    charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
    token = ''.join(secrets.choice(charset) for _ in range(60))
    SecureToken.objects.create(token=token)
