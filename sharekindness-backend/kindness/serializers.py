# serializers.py
from rest_framework import serializers
from .models import User, Donation, Request

# User Serializer 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'profile_picture', 'contact_info']

# Register Serializer 
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'profile_picture', 'contact_info']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)  # Donor details are read-only

    class Meta:
        model = Donation
        fields = ['id', 'donor', 'title', 'description', 'category', 'quantity', 'image', 'status', 'created_at']

# Request Serializer
class RequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # User details are read-only
    donation = DonationSerializer(read_only=True)

    class Meta:
        model = Request
        fields = ['id', 'user', 'donation', 'status', 'message', 'created_at']
