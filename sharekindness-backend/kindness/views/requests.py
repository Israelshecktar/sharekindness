import logging
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

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
