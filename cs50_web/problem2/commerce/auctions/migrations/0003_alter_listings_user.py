# Generated by Django 5.0 on 2024-01-02 03:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("auctions", "0002_listings"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listings",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="list_items",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
