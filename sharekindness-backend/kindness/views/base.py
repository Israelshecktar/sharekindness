import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)


def handle_error(message, status_code):
    """Helper function to create error responses and log messages."""
    logger.error(message)
    return Response({"error": message}, status=status_code)


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


class LogView(APIView):
    """
    Example log view for demonstration.
    """
    permission_classes = []  # You could set to [AllowAny] or otherwise

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
