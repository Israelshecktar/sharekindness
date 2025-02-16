"""
URL configuration for kindness project.

The `urlpatterns` list routes URLs to views. For more information, please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Import your newly modularized views
# Adjust import paths based on your actual project structure
from kindness.views.auth import RegisterView, LoginView, LogoutView, ChangePasswordView
from kindness.views.donations import DonationListCreateView, DonationDetailView
from kindness.views.requests import RequestListCreateView, RequestDetailView
from kindness.views.base import LogView
from kindness.views.user import UserDashboardView, UserNotificationView, UserProfileView
from kindness.views.requests import RequestListCreateView, RequestDetailView, MarkAsClaimedView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth endpoints
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/user/change-password/', ChangePasswordView.as_view(), name='change-password'),  # New

    # Donation endpoints
    path('api/donations/', DonationListCreateView.as_view(), name='donation-list-create'),
    path('api/donations/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),

    # Request endpoints
    path('api/requests/', RequestListCreateView.as_view(), name='request-list-create'),
    path('api/requests/<int:pk>/', RequestDetailView.as_view(), name='request-detail'),
    path('api/requests/<int:pk>/mark-as-claimed/', MarkAsClaimedView.as_view(), name='mark-as-claimed'),

    # Log endpoint
    path('api/log/', LogView.as_view(), name='log'),

    # User endpoints
    path('api/user-dashboard/', UserDashboardView.as_view(), name='user-dashboard'),
    path('api/user-notifications/', UserNotificationView.as_view(), name='user-notifications'),
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),  # New

    # JWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
