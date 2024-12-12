import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer, DonationSerializer, RequestSerializer
from .models import Donation, Request

logger = logging.getLogger(__name__)

# 1️⃣ Register View (POST /register/)
class RegisterView(APIView):
    def post(self, request):
        logger.info("Register request received with data: %s", request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = UserSerializer(user).data
            logger.info("User registered successfully: %s", user_data)
            return Response({
                'message': 'User registered successfully!',
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        logger.error("Register request failed: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 2️⃣ Login View (POST /login/)
class LoginView(APIView):
    def post(self, request):
        logger.info("Login request received with data: %s", request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens (Access & Refresh)
            refresh = RefreshToken.for_user(user)
            logger.info("Login successful for user: %s", username)
            return Response({
                'message': 'Login successful!',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            logger.error("Login request failed: Invalid username or password")
            return Response({
                'error': 'Invalid username or password'
            }, status=status.HTTP_401_UNAUTHORIZED)


# 3️⃣ Donation List/Create View (GET, POST /donations/)
class DonationListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(donor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 4️⃣ Donation Detail View (GET, PUT, DELETE /donations/<id>/)
class DonationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Donation.objects.get(pk=pk)
        except Donation.DoesNotExist:
            return None

    def get(self, request, pk):
        donation = self.get_object(pk)
        if donation:
            serializer = DonationSerializer(donation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Donation not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        donation = self.get_object(pk)
        if donation:
            serializer = DonationSerializer(donation, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Donation not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        donation = self.get_object(pk)
        if donation:
            donation.delete()
            return Response({'message': 'Donation deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Donation not found'}, status=status.HTTP_404_NOT_FOUND)


# 5️⃣ Request List/Create View (GET, POST /requests/)
class RequestListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = Request.objects.all()
        serializer = RequestSerializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        donation_id = request.data.get('donation')
        try:
            donation = Donation.objects.get(pk=donation_id)
        except Donation.DoesNotExist:
            return Response({'error': 'Donation not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, donation=donation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 6️⃣ Request Detail View (GET, PUT, DELETE /requests/<id>/)
class RequestDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return None

    def get(self, request, pk):
        request_obj = self.get_object(pk)
        if request_obj:
            serializer = RequestSerializer(request_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        request_obj = self.get_object(pk)
        if request_obj:
            serializer = RequestSerializer(request_obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        request_obj = self.get_object(pk)
        if request_obj:
            request_obj.delete()
            return Response({'message': 'Request deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
