import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
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
    """Helper function to create error responses and log messages."""
    logger.error(message)
    return Response({"error": message}, status=status_code)


# 1⃣ Register View
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


# 2⃣ Login View
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


# 3⃣ Logout View
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


# 4⃣ Base List/Create View
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
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def get_additional_data(self, request):
        """Override to add extra data before saving."""
        return {}


# 5⃣ Base Detail View
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
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        obj.delete()
        return Response(
            {"message": f"{self.model.__name__} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


# 6⃣ Donation Views
class DonationListCreateView(BaseListCreateView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        if serializer.is_valid():
            donation = serializer.save(donor=request.user)
            logger.info(f"Donation created successfully: ID={donation.id}, Name={donation.item_name}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)


class DonationDetailView(BaseDetailView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer


# Request Views
class RequestListCreateView(BaseListCreateView):
    permission_classes = [IsAuthenticated]
    model = Request
    serializer_class = RequestSerializer

    def post(self, request):
        donation_id = request.data.get("donation")
        requested_quantity = request.data.get("requested_quantity", 0)

        if not donation_id:
            return handle_error("Donation ID is required.", status.HTTP_400_BAD_REQUEST)

        # Fetch donation
        donation = get_object_or_404(Donation, pk=donation_id)

        # Validate donation availability
        if donation.status != 'AVAILABLE':
            return handle_error("This donation is not available for requests.", status.HTTP_400_BAD_REQUEST)

        # Prevent duplicate requests by the same user
        if Request.objects.filter(user=request.user, donation=donation).exists():
            return handle_error("You have already requested this donation.", status.HTTP_400_BAD_REQUEST)

        # Ensure the maximum number of requests has not been reached
        if donation.requests.count() >= 5:
            donation.status = 'CLOSED'
            donation.save()
            return handle_error("This donation is no longer accepting requests.", status.HTTP_400_BAD_REQUEST)

        # Validate requested quantity
        try:
            requested_quantity = int(requested_quantity)
            if requested_quantity <= 0:
                return handle_error("Requested quantity must be greater than zero.", status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return handle_error("Invalid requested quantity format.", status.HTTP_400_BAD_REQUEST)

        # Save the request (do not subtract from the donation quantity yet)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            request_obj = serializer.save(user=request.user, donation=donation)
            logger.info(f"Request created successfully for donation ID={donation_id}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return handle_error(serializer.errors, status.HTTP_400_BAD_REQUEST)



class RequestDetailView(BaseDetailView):
    permission_classes = [IsAuthenticated]
    model = Request
    serializer_class = RequestSerializer

class UserDonationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve donations made by the logged-in user, including associated requests.
        """
        user = request.user

        # Ensure only donors can view their donations
        if user.role != 'DONOR':
            return handle_error("You are not authorized to view this page.", status.HTTP_403_FORBIDDEN)

        # Fetch the donations and prefetch related requests for optimization
        donations = Donation.objects.filter(donor=user).prefetch_related('requests')
        data = [
            {
                "donation": DonationSerializer(donation).data,
                "requests": RequestSerializer(donation.requests.all(), many=True).data
            }
            for donation in donations
        ]

        return Response(data, status=status.HTTP_200_OK)



# 8⃣ Log View
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