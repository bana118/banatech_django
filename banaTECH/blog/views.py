from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Article
from .forms import ArticleForm

# Create your views here.

def blog(request):
    return render(request, "blog.html")

@login_required
def post(request):
    form = ArticleForm()
    return render(request, "post.html", {"form": form})

@login_required
def posted(request):
    form = ArticleForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return render(request, "blog.html")