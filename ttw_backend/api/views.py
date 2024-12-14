# api/views.py
from django.http import JsonResponse
import secrets
from .models import SecureToken

def get_latest_token(request):
    try:
        latest_token = SecureToken.objects.latest('created_at')
        return JsonResponse({'secure_code': latest_token.token})
    except SecureToken.DoesNotExist:
        return JsonResponse({'secure_code': 'No token available yet'})

