from django.contrib.auth.models import AbstractUser
from django.db import models

# 1⃣ Custom User model
class User(AbstractUser):
    ROLE_CHOICES = [
        ('DONOR', 'Donor'),
        ('RECIPIENT', 'Recipient'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='RECIPIENT')
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    contact_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


# 2⃣ Donation model
class Donation(models.Model):
    CATEGORY_CHOICES = [
        ('FOOD', 'Food'),
        ('CLOTHES', 'Clothes'),
        ('BOOKS', 'Books'),
        ('ELECTRONICS', 'Electronics'),
        ('OTHER', 'Other'),
    ]
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    quantity = models.PositiveIntegerField(default=1)  # New field for quantity
    image = models.ImageField(upload_to='donation_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ('AVAILABLE', 'Available'),
        ('PENDING', 'Pending'),
        ('CLAIMED', 'Claimed'),
    ], default='AVAILABLE')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"


# 3⃣ Request model
class Request(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name='requests')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.user.username} for {self.donation.title} ({self.get_status_display()})"

    class Meta:
        unique_together = ('user', 'donation')
