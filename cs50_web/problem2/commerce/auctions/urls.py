from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create, name="create"),
    path("listings/<int:id>", views.listings, name="listings"),
    path("watch/<int:id>", views.watch, name="watch"),
    path("unwatch/<int:id>", views.unwatch, name="unwatch"),
    path("end/<int:id>", views.end, name="end"),
    path("inactive", views.inactive, name="inactive"),
    path("comment/<int:id>", views.comment, name="comment"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("categories", views.categories, name="categories"),
    path("category/<category>", views.category, name="category"),
    path("bid/<int:id>", views.bid, name="bid"),
]
