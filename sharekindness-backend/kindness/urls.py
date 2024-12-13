"""
URL configuration for kindness project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from kindness.views import RegisterView, LoginView, DonationListCreateView, DonationDetailView, RequestListCreateView, RequestDetailView, LogView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/donations/', DonationListCreateView.as_view(), name='donation-list-create'),
    path('api/donations/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),
    path('api/requests/', RequestListCreateView.as_view(), name='request-list-create'),
    path('api/requests/<int:pk>/', RequestDetailView.as_view(), name='request-detail'),
    path('api/log/', LogView.as_view(), name='log'),
]

