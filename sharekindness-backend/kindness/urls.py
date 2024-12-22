"""
URL configuration for kindness project.

The `urlpatterns` list routes URLs to views. For more information, please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from kindness.views import (
    RegisterView, 
    LoginView, 
    LogoutView, 
    DonationListCreateView, 
    DonationDetailView, 
    RequestListCreateView, 
    RequestDetailView, 
    LogView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/donations/', DonationListCreateView.as_view(), name='donation-list-create'),
    path('api/donations/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),
    path('api/requests/', RequestListCreateView.as_view(), name='request-list-create'),
    path('api/requests/<int:pk>/', RequestDetailView.as_view(), name='request-detail'),
    path('api/log/', LogView.as_view(), name='log'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
