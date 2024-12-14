# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('get-latest-token/', views.get_latest_token, name='get_latest_token'),
]
