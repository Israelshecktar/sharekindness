from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# 1️⃣ User Data Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'profile_picture', 'contact_info']


# 2️⃣ Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'profile_picture', 'contact_info']

    def create(self, validated_data):
        """Hash the password before saving the user"""
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user
