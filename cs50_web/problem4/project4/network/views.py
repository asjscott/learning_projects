import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt

from .models import User, Post


def index(request):
    posts = Post.objects.all().order_by('-date_created')

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "network/index.html", {
        "posts": page_obj,
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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def new_post(request):
    new_post = Post(post=request.POST.get('new_post'), user=request.user)
    new_post.save()
    return redirect("index")


def profile(request, username):
    profile = User.objects.get(username=username)
    posts = Post.objects.filter(user=profile.id).order_by('-date_created')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    following = len(profile.following.all())
    followers = len(profile.followers.all())
    button = "Follow" if request.user not in profile.followers.all() else "Unfollow"
    return render(request, "network/profile.html", {
        "posts" : page_obj,
        "profile": profile,
        "followers": followers,
        "following": following,
        "button": button,
    })


@login_required
def follow(request, user_id, profile_id):
    user = User.objects.get(id=user_id)
    profile = User.objects.get(id=profile_id)
    user.following.add(profile)
    user.save()
    return redirect("profile", profile.username)


@login_required
def unfollow(request, user_id, profile_id):
    user = User.objects.get(id=user_id)
    profile = User.objects.get(id=profile_id)
    user.following.remove(profile)
    user.save()
    return redirect("profile", profile.username)


@login_required
def following(request):
    user = request.user
    posts = Post.objects.filter(user__in=user.following.all()).order_by("-date_created")
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "network/following.html", {
        "posts": page_obj
    })


@csrf_exempt
@login_required
def edit(request, id):

    # Query for requested post
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    # Return post contents
    if request.method == "GET":
        return JsonResponse(post.serialize())

    # Update whether post is editted or liked
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("post") is not None:
            post.post = data["post"]
        if data.get("likes") is not None:
            if request.user not in post.liker.all():
                post.liker.add(request.user)
            else:
                post.liker.remove(request.user)
            post.like_count = len(post.liker.all())
        post.save()

        return HttpResponse(status=204)

    # Post must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)
