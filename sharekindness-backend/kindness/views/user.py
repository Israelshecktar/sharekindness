import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from ..models import Donation, Request
from ..serializers import DonationSerializer, RequestSerializer, UserSerializer
from .base import handle_error

logger = logging.getLogger(__name__)
User = get_user_model()


class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve donations and requests associated with the logged-in user.
        """
        user = request.user

        # Fetch the donations made by the user
        user_donations = Donation.objects.filter(donor=user).prefetch_related('requests__user')

        # Fetch the requests made by the user
        user_requests = Request.objects.filter(user=user).select_related('donation', 'donation__donor')

        data = {
            "donations": [
                {
                    "donation": DonationSerializer(donation, context={"request": request}).data,
                    "requests": [
                        {
                            "id": req.id,
                            "user": UserSerializer(req.user, context={"request": request}).data,
                            "requested_quantity": req.requested_quantity,
                            "comments": req.comments,
                        }
                        for req in donation.requests.all()
                    ],
                }
                for donation in user_donations
            ],
            "requests": [
                {
                    "id": req.id,
                    "donation": DonationSerializer(req.donation, context={"request": request}).data,
                    "status": req.status,
                    "requested_quantity": req.requested_quantity,
                    "comments": req.comments,
                }
                for req in user_requests
            ],
        }

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Handle actions like approving/rejecting requests for the user's donations.
        """
        action = request.data.get("action")
        request_id = request.data.get("request_id")

        if action not in ["approve", "reject"]:
            return handle_error("Invalid action specified.", status.HTTP_400_BAD_REQUEST)

        try:
            donation_request = Request.objects.select_related("donation").get(
                id=request_id, donation__donor=request.user
            )
        except Request.DoesNotExist:
            return handle_error("Request not found or not authorized.", status.HTTP_404_NOT_FOUND)

        # Ensure the donation is still available
        donation = donation_request.donation
        if donation.status in ["CLOSED", "CLAIMED"]:
            return handle_error("This donation is no longer available for requests.", status.HTTP_400_BAD_REQUEST)

        if action == "approve":
            if donation_request.status != "PENDING":
                return handle_error("Request is already processed.", status.HTTP_400_BAD_REQUEST)

            # Update the request status to approved
            donation_request.status = "APPROVED"
            donation_request.save()

            # Subtract the requested quantity from the donation
            donation.quantity -= donation_request.requested_quantity

            # Close the donation if the quantity reaches zero
            if donation.quantity <= 0:
                donation.status = "CLOSED"
            donation.save()

            # Reject other pending requests for the same donation
            Request.objects.filter(
                donation=donation, status="PENDING"
            ).exclude(id=donation_request.id).update(status="REJECTED")

            return Response(
                {"message": "Request approved successfully."}, 
                status=status.HTTP_200_OK
            )

        elif action == "reject":
            if donation_request.status != "PENDING":
                return handle_error("Request is already processed.", status.HTTP_400_BAD_REQUEST)

            # Update the request status to rejected
            donation_request.status = "REJECTED"
            donation_request.save()

            return Response(
                {"message": "Request rejected successfully."}, 
                status=status.HTTP_200_OK
            )


class UserNotificationView(APIView):
    """
    API View to fetch the notification counts for the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Count pending requests on the user's donations
        user_donations = Donation.objects.filter(donor=user)
        pending_requests_count = Request.objects.filter(
            donation__in=user_donations, status="PENDING"
        ).count()

        # Count pending requests made by the user
        pending_donations_count = Request.objects.filter(
            user=user, status="PENDING"
        ).count()

        return Response(
            {
                "pending_requests": pending_requests_count,
                "pending_donations": pending_donations_count,
            },
            status=200,
        )


class UserProfileView(APIView):
    """
    Fetch, update, and delete user profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Fetch user profile data."""
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """Update user profile."""
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """Delete user account."""
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
