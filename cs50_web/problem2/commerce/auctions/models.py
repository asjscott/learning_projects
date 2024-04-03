from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    watchlist_counter = models.IntegerField(default=0, blank=True)
    watchlist = models.ManyToManyField("Listings", related_name="watchlist", blank=True)


class Listings(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    starting_bid = models.DecimalField(max_digits=11, decimal_places=2)
    price = models.DecimalField(max_digits=11, decimal_places=2, blank=True)
    image_url = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    bid_counter = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="list_items")
    active = models.BooleanField(default=True)
    winner = models.CharField(max_length=100, blank=True, null=True)


class Bids(models.Model):
    item = models.ForeignKey(Listings, on_delete=models.CASCADE, related_name="bidder")
    amount = models.DecimalField(max_digits=11, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Listings, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True)
