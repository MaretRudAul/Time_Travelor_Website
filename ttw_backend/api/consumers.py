import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer


class TokenUpdateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Add the client to the "token_updates" group
        await self.channel_layer.group_add("token_updates", self.channel_name)
        await self.accept()

        # Send the most recent token to the client on connection
        latest_token = await self.get_latest_token()
        if latest_token:
            await self.send(json.dumps({"secure_code": latest_token}))

    async def disconnect(self, close_code):
        # Remove the client from the "token_updates" group
        await self.channel_layer.group_discard("token_updates", self.channel_name)

    async def send_token(self, event):
        """
        Handles broadcasting the token to WebSocket clients.
        """
        token = event["token"]
        await self.send(json.dumps({"secure_code": token}))

    @database_sync_to_async
    def get_latest_token(self):
        from .models import SecureToken

        try:
            return SecureToken.objects.latest("created_at").token
        except SecureToken.DoesNotExist:
            return None
