import secrets

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import SecureToken


def generate_token():
    # Generate a new token and save it to the database
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    token = "".join(secrets.choice(charset) for _ in range(60))
    SecureToken.objects.create(token=token)

    # Broadcast the token to WebSocket clients
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "token_updates",
        {
            "type": "send_token",
            "token": token,
        },
    )
