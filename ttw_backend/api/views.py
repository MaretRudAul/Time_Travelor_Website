from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import SignupSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated, AllowAny

User = get_user_model()

class SignupAPIView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    authentication_classes = []         # Clear any default auth
    permission_classes = [AllowAny]     # Allow signup without credentials

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(
                {"username": ["Username is already taken."]},
                status=status.HTTP_400_BAD_REQUEST
            )

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    authentication_classes = []         # Clear any default auth
    permission_classes = [AllowAny]     # Allow signup without credentials

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class UsernameAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({"username": request.user.username}, status=status.HTTP_200_OK)


def get_current_token(user):
    from .models import SecureToken

    try:
        return SecureToken.objects.latest("created_at").token
    except SecureToken.DoesNotExist:
        return None

# @method_decorator(csrf_exempt, name='dispatch')
class GetTokenView(generics.RetrieveAPIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=401)
        
        token = get_current_token(request.user)
        return Response({'token': token})
