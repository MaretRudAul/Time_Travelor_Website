from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/token-updates/', consumers.TokenUpdateConsumer.as_asgi()),
]
