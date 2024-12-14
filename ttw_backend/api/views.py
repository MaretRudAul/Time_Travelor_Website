# api/views.py
from django.http import JsonResponse
import secrets

def generate_code(request):
    charset = (
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "0123456789"
        "!@#$%^&*()_+~`|}{[]:;?><,./-="
    )
    length = 60
    secure_code = "".join(secrets.choice(charset) for _ in range(length))
    return JsonResponse({"secure_code": secure_code})

