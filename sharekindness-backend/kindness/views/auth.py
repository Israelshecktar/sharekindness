import logging
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import check_password, make_password
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .base import handle_error
from ..serializers import RegisterSerializer, UserSerializer

logger = logging.getLogger(__name__)
User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Ensure the user is initially unverified
            user.is_verified = False
            user.save()
            return Response(
                {
                    "message": "User registered successfully!",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return handle_error("Email and password are required.", status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful!",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )
        return handle_error("Invalid email or password.", status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return handle_error("Refresh token is required for logout.", status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info(f"Token successfully blacklisted for user {request.user.id}")
            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        except TokenError:
            return handle_error("Invalid or expired refresh token.", status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    """
    Handle password change for authenticated users.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not old_password or not new_password or not confirm_password:
            return handle_error("All fields are required.", status.HTTP_400_BAD_REQUEST)

        if not check_password(old_password, user.password):
            return handle_error("Old password is incorrect.", status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return handle_error("New password and confirm password do not match.", status.HTTP_400_BAD_REQUEST)

        # Update the user's password
        user.password = make_password(new_password)
        user.save()
        logger.info(f"Password changed successfully for user {user.id}")
        return Response({"message": "Password changed successfully!"}, status=status.HTTP_200_OK)
