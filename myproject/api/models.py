from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.username

class Seller(models.Model):
    name = models.CharField(max_length=100)  # Change to match 'owner_name' from frontend
    domain = models.CharField(max_length=20)  # Change to match 'shop_domain'
    mobile_number = models.CharField(max_length=15)
    description = models.CharField(max_length=1000)  # Change to match 'shop_description'
    email = models.CharField(max_length=100)  # Increased max_length for email safety
    GST_ID = models.CharField(max_length=20)

    def __str__(self):
        return self.name
