from django.contrib.auth.models import AbstractUser
from django.db import models


# 1⃣ Custom User model
class User(AbstractUser):
    ROLE_CHOICES = [
        ('DONOR', 'Donor'),
        ('RECIPIENT', 'Recipient'),
    ]
    email = models.EmailField(unique=True)
    roles = models.ManyToManyField('Role', related_name='users')  # Many-to-Many relationship
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    contact_info = models.TextField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Keep 'username' for compatibility

    def __str__(self):
        return f"{self.email} (Roles: {', '.join(role.name for role in self.roles.all())})"


class Role(models.Model):
    name = models.CharField(max_length=20, choices=User.ROLE_CHOICES, unique=True)

    def __str__(self):
        return self.name


# 2⃣ Donation model
class Donation(models.Model):
    CATEGORY_CHOICES = [
        ('FOOD', 'Food'),
        ('CLOTHES', 'Clothes'),
        ('BOOKS', 'Books'),
        ('ELECTRONICS', 'Electronics'),
        ('OTHER', 'Other'),
    ]
    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),  # Donation is available for requests.
        ('RESERVED', 'Reserved'),  # A request has been approved but not yet claimed.
        ('CLAIMED', 'Claimed'),  # Donation has been picked up or delivered.
        ('EXPIRED', 'Expired'),  # Donation is no longer available.
        ('CLOSED', 'Closed'),  # Donation is closed by the donor.
    ]
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    item_name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    quantity = models.PositiveIntegerField(default=1)  # Field to track quantity
    image = models.ImageField(upload_to='donation_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} ({self.get_status_display()})"


class Request(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('CLAIMED', 'Claimed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name='requests')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    requested_quantity = models.PositiveIntegerField(default=1)
    comments = models.CharField(max_length=255, blank=True, null=True)  # Optional comment field (50-word limit)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.user.email} for {self.donation.item_name} ({self.get_status_display()})"

    class Meta:
        unique_together = ('user', 'donation')
