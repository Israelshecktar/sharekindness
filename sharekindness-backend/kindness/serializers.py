from rest_framework import serializers
from .models import User, Donation, Request

# User Serializer 
class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()  # Dynamic field for roles

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'roles', 
            'profile_picture', 
            'phone_number', 
            'city', 
            'state', 
            'bio', 
            'is_verified'
        ]

    def get_roles(self, obj):
        # Return user roles dynamically based on their donations and requests
        roles = []
        if obj.donations.exists():
            roles.append("DONOR")
        if obj.requests.exists():
            roles.append("RECIPIENT")
        return roles



# Register Serializer 
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'username', 
            'email', 
            'password', 
            'profile_picture', 
            'phone_number', 
            'city', 
            'state', 
            'bio'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.is_verified = False  # Ensure the user is initially unverified
        user.save()
        return user


# Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)  # Donor details are read-only
    donor_name = serializers.CharField(source='donor.username', read_only=True)  # Include donor username

    class Meta:
        model = Donation
        fields = ['id', 'donor', 'donor_name', 'item_name', 'description', 'category', 'quantity', 'image', 'status', 'created_at']

    def validate(self, data):
        # Ensure at least one image is provided in the request
        request = self.context.get("request")
        if not request or not request.FILES.get('image'):
            raise serializers.ValidationError({"image": "At least one image is required."})
        return data

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
        fields = ['id', 'user', 'donation', 'status', 'comments', 'requested_quantity', 'created_at']

    def validate_requested_quantity(self, value):
        # Ensure requested quantity is a positive integer
        if value <= 0:
            raise serializers.ValidationError("Requested quantity must be a positive number.")
        return value
