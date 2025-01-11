import logging
from rest_framework.permissions import IsAuthenticated
from ..models import Donation
from ..serializers import DonationSerializer
from .base import BaseListCreateView, BaseDetailView, handle_error

logger = logging.getLogger(__name__)


class DonationListCreateView(BaseListCreateView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        if serializer.is_valid():
            donation = serializer.save(donor=request.user)
            logger.info(f"Donation created successfully: ID={donation.id}, Name={donation.item_name}")
            return handle_error(serializer.data, 201)
        return handle_error(serializer.errors, 400)


class DonationDetailView(BaseDetailView):
    permission_classes = [IsAuthenticated]
    model = Donation
    serializer_class = DonationSerializer
