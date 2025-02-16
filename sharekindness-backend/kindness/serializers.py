from rest_framework import serializers
from .models import User, Donation, Request


# ---------------------------
# User Serializer
# ---------------------------
class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False
    )

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'profile_picture', 
            'phone_number', 'city', 'state', 'bio'
        ]

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.city = validated_data.get('city', instance.city)
        instance.state = validated_data.get('state', instance.state)
        instance.bio = validated_data.get('bio', instance.bio)
        
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data.get('profile_picture')
        
        instance.save()
        return instance


# ---------------------------
# Register Serializer
# ---------------------------
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


# ---------------------------
# Donation Serializer (Updated)
# ---------------------------
class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)  # Donor details are read-only
    donor_name = serializers.CharField(source='donor.username', read_only=True)  # Donor username
    claimed_by = serializers.SerializerMethodField()  # ✅ NEW: List of claimed recipients

    class Meta:
        model = Donation
        fields = [
            'id', 'donor', 'donor_name', 'item_name', 'description', 
            'category', 'quantity', 'image', 'status', 'created_at', 'claimed_by'
        ]

    def get_claimed_by(self, obj):
        """
        Returns a list of usernames who have claimed the donation.
        """
        claimed_requests = obj.requests.filter(status="CLAIMED")  # Get all CLAIMED requests
        return [req.user.username for req in claimed_requests]  # Extract usernames

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


# ---------------------------
# Request Serializer
# ---------------------------
class RequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # User details are read-only
    donation = DonationSerializer(read_only=True)

    class Meta:
        model = Request
        fields = [
            'id', 'user', 'donation', 'status', 'comments', 
            'requested_quantity', 'created_at'
        ]

    def validate_requested_quantity(self, value):
        # Ensure requested quantity is a positive integer
        if value <= 0:
            raise serializers.ValidationError("Requested quantity must be a positive number.")
        return value
