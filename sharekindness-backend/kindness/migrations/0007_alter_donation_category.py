# Generated by Django 4.2.17 on 2024-12-23 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kindness', '0006_alter_donation_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='category',
            field=models.CharField(choices=[('FOOD', 'Food'), ('CLOTHES', 'Clothes'), ('BOOKS', 'Books'), ('ELECTRONICS', 'Electronics'), ('OTHER', 'Other')], default='OTHER', max_length=20),
        ),
    ]
