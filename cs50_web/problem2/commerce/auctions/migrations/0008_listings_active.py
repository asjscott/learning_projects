# Generated by Django 5.0 on 2024-01-03 04:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("auctions", "0007_user_watchlist_user_watchlist_counter"),
    ]

    operations = [
        migrations.AddField(
            model_name="listings",
            name="active",
            field=models.BooleanField(default=True),
        ),
    ]
