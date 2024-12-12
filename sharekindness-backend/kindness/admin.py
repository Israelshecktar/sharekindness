from django.contrib import admin
from .models import User, Donation, Request

admin.site.register(User)
admin.site.register(Donation)
admin.site.register(Request)
