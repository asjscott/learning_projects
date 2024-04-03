from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist

from .models import User, Listings, Bids, Comments
from .forms import NewItemForm


def index(request):

    return render(request, "auctions/index.html", {
        "listings": Listings.objects.all()
    })


def inactive(request):

    return render(request, "auctions/inactive.html", {
        "listings": Listings.objects.all()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


@login_required
def create(request):
    if request.method == "POST":
        form = NewItemForm(request.POST)
        if form.is_valid():
            new_listing = Listings(user=request.user, **form.cleaned_data)
            new_listing.price = new_listing.starting_bid
            if new_listing.image_url == "":
                new_listing.image_url = "https://cdn.pixabay.com/photo/2014/07/27/09/42/e-commerce-402822_1280.jpg"
            new_listing.save()
            return HttpResponseRedirect(reverse("index"))
    return render(request, "auctions/create.html", {
        'form': NewItemForm(),
    })


def listings(request, id):
    try:
        item = Listings.objects.get(id=id)
    except ObjectDoesNotExist:
        return render(request, "auctions/listing.html", {
            "Error": "Error. The item object does not exist."
        })
    bids = Bids.objects.filter(item=id)
    item.bid_counter = len(bids)
    if bids:
        bid = bids.order_by('-amount')[0]
        item.price = bid.amount
    else:
        bid =  bids
        item.price = item.starting_bid
    item.save()
    comments = Comments.objects.filter(item=id)
    user = request.user
    return render(request, "auctions/listing.html", {
            "item": item,
            "bid": bid,
            "user": user,
            "comments": comments,
            })

def bid(request, id):
    item = Listings.objects.get(id=id)
    comments = Comments.objects.filter(item=id)
    amount = float(request.POST.get("bid"))
    if amount <= item.price:
        return render(request, "auctions/listing.html", {
            "message" : "The bid must exceed the current price.",
            "item": item,
            "comments": comments,
        })
    item.price = "{:.2f}".format(amount)
    item.save()
    new_bid = Bids(amount=amount, user=request.user, item=item)
    new_bid.save()
    return redirect("listings", id)


@login_required
def watch(request, id):
    item = Listings.objects.get(id=id)
    user = request.user
    user.watchlist.add(item)
    user.watchlist_counter = len(user.watchlist.all())
    user.save()
    return redirect("listings", id)


@login_required
def unwatch(request, id):
    item = Listings.objects.get(id=id)
    user = request.user
    user.watchlist.remove(item)
    user.watchlist_counter = len(user.watchlist.all())
    user.save()
    return redirect("listings", id)


@login_required
def end(request, id):
    winner = Bids.objects.get(id=id)
    item = Listings.objects.get(id=id)
    item.active = False
    item.winner = winner.user.username
    item.save()
    return redirect("listings", id)


@login_required
def comment(request, id):
    comment = request.POST.get("comment")
    new_comment = Comments(comment=comment, item=Listings.objects.get(id=id), user=request.user)
    new_comment.save()
    return redirect("listings", id)


@login_required
def watchlist(request):
    user = request.user
    items = user.watchlist.all()
    return render(request, "auctions/watchlist.html", {
        "items": items,
    })

def categories(request):
    categories = Listings.objects.order_by().values('category').distinct()
    return render(request, "auctions/categories.html", {
        "categories": categories,
    })


def category(request, category):
    items = Listings.objects.filter(category=category)
    return render(request, "auctions/category.html", {
        "items": items,
    })
