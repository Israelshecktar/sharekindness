import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    DonationSerializer,
    RequestSerializer,
)
from .models import Donation, Request

logger = logging.getLogger(__name__)
User = get_user_model()

def handle_error(message, status_code):
    """Helper for creating error responses and logging."""
    logger.error(message)
    return Response({"error": message}, status=status_code)

# 1⃣ Register View (POST /register/)
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully!",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return handle_error("Invalid registration data.", status.HTTP_400_BAD_REQUEST)

# 2⃣ Login View (POST /login/)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return handle_error("Email and password are required.", status.HTTP_400_BAD_REQUEST)

        # Use `username=email` to pass email to the authentication backend
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

# 3⃣ Logout View (POST /logout/)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Invalidate the refresh token to log out the user.
        """
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            logger.warning("Logout attempt without refresh token.")
            return handle_error("Refresh token is required.", status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            # Blacklist the token
            token.blacklist()
            logger.info(f"Token blacklisted for user {request.user.id}")
            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        except TokenError as e:
            logger.error(f"TokenError during logout: {str(e)}")
            return handle_error("Invalid refresh token.", status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected error during logout: {str(e)}")
            return handle_error("Something went wrong during logout.", status.HTTP_500_INTERNAL_SERVER_ERROR)

# Base Class for List/Create Views
class BaseListCreateView(APIView):
    model = None
    serializer_class = None

    def get(self, request):
        objects = self.model.objects.all()
        serializer = self.serializer_class(objects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(**self.get_additional_data(request))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return handle_error("Invalid data.", status.HTTP_400_BAD_REQUEST)

    def get_additional_data(self, request):
        """Override this method to pass additional data on POST."""
        return {}

# Base Class for Detail Views
class BaseDetailView(APIView):
    model = None
    serializer_class = None

    def get(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        serializer = self.serializer_class(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return handle_error("Invalid data.", status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        obj.delete()
        return Response(
            {"message": f"{self.model.__name__} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )

# 4⃣ Donation Views
class DonationListCreateView(BaseListCreateView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer

    def get_additional_data(self, request):
        return {"donor": request.user}

class DonationDetailView(BaseDetailView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer

# 5⃣ Request Views
class RequestListCreateView(BaseListCreateView):
    permission_classes = [IsAuthenticated]
    model = Request
    serializer_class = RequestSerializer

    def post(self, request):
        donation_id = request.data.get("donation")
        donation = get_object_or_404(Donation, pk=donation_id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, donation=donation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return handle_error("Invalid data.", status.HTTP_400_BAD_REQUEST)

class RequestDetailView(BaseDetailView):
    permission_classes = [IsAuthenticated]
    model = Request
    serializer_class = RequestSerializer

# 6⃣ Log View (POST /log/)
class LogView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        message = request.data.get("message")
        level = request.data.get("level", "info").lower()

        log_function = {
            "info": logger.info,
            "error": logger.error,
            "debug": logger.debug,
        }.get(level, logger.info)

        log_function(message)
        return Response({"status": "logged"}, status=status.HTTP_200_OK)