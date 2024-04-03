from django.shortcuts import render, redirect
from markdown2 import markdown
from random import randint

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })


def entry(request, title):
    content = util.get_entry(title)
    if content == None:
        message = "Entry not found"
        return render(request, "encyclopedia/entry.html", {
            "message" : message,
            "content": content,
            "title": title
        })
    content = markdown(content)
    return render(request, "encyclopedia/entry.html", {
        "content": content,
        "title": title
    })


def search(request):
    q = request.GET.get('q')
    entries = util.list_entries()
    for entry in entries:
        if q.lower() == entry.lower():
            return redirect("entry", title=q)
    results = [entry for entry in entries if q.lower() in entry.lower()]
    return render(request, "encyclopedia/search.html", {
        "results":results,
        "q": q,
        })


def create(request):
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        if title == "" or content == "":
            return render(request, "encyclopedia/create.html", {
                "message": "title or content cannot be empty",
                "title": title,
                "content": content})
        if title in util.list_entries():
                return render(request, "encyclopedia/create.html", {
                    "message": "Title field already taken, cannot be duplicated.",
                    "title": title,
                    "content": content,
                })
        util.save_entry(title, content)
        return redirect("entry", title=title)
    return render(request, "encyclopedia/create.html")


def edit(request, title):
    content = util.get_entry(title)
    print(title)
    if request.method == 'POST':
        print(title)
        content = request.POST.get('content')
        if content == "":
            return render(request, "encyclopedia/edit.html", {
                "title": title,
                "content": content,
                "message": "Content cannot be blank",
            })
        util.save_entry(title, content)
        return redirect("entry", title=title)
    return render(request, "encyclopedia/edit.html", {
        "title": title,
        "content": content,
    })


def random(request):
    entries = util.list_entries()
    title = entries[randint(0, (len(entries) - 1))]
    return redirect("entry", title=title)
