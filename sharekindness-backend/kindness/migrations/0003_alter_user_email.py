# Generated by Django 4.2.17 on 2024-12-22 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kindness', '0002_donation_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]