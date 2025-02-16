import logging
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from ..models import Donation, Request
from ..serializers import RequestSerializer, DonationSerializer
from .base import BaseListCreateView, BaseDetailView, handle_error

logger = logging.getLogger(__name__)


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


class MarkAsClaimedView(APIView):
    """
    Allows recipients to mark their approved donation request as claimed.
    Once all approved requests for a donation are claimed, the donation itself is marked as claimed.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        request_obj = get_object_or_404(Request, pk=pk)

        # Ensure only the recipient can claim their approved item
        if request.user != request_obj.user:
            return handle_error("You can only claim your own approved requests.", status=403)

        # Ensure the request is approved before marking as claimed
        if request_obj.status != 'APPROVED':
            return handle_error("Only approved requests can be marked as claimed.", status=400)

        # Mark request as claimed
        request_obj.status = 'CLAIMED'
        request_obj.save()

        # Check if all approved requests for this donation are now claimed
        donation = request_obj.donation
        all_claimed = not donation.requests.filter(status='APPROVED').exists()

        if all_claimed:
            donation.status = 'CLAIMED'  # Mark donation as fully claimed
            donation.save()

        logger.info(f"Request ID={request_obj.id} for donation '{donation.item_name}' has been marked as claimed.")

        return Response({"message": "Item successfully claimed!"}, status=200)
