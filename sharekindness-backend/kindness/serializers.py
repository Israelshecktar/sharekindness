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
        fields = ['id', 'donor', 'item_name', 'description', 'category', 'quantity', 'image', 'status', 'created_at']

    def validate_category(self, value):
        valid_choices = [choice[0] for choice in Donation.CATEGORY_CHOICES]
        if value not in valid_choices:
            raise serializers.ValidationError(f"'{value}' is not a valid choice. Valid choices are: {valid_choices}.")
        return value


# Request Serializer
class RequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # User details are read-only
    donation = DonationSerializer(read_only=True)

    class Meta:
        model = Request
        fields = ['id', 'user', 'donation', 'status', 'message', 'created_at']
