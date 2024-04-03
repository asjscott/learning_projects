from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField("User", related_name="followers", blank=True)
    liked = models.ManyToManyField("Post", related_name="liker", blank=True)


class Post(models.Model):
    post = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    like_count = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def serialize(self):
        return {
            "id": self.id,
            "post": self.post,
            "date_created": self.date_created.strftime("%b %d %Y, %I:%M %p"),
            "like_count": self.like_count,
            "liker": [user.username for user in self.liker.all()],
        }
