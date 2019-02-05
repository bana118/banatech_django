from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Article
from .forms import ArticleForm

# Create your views here.

def blog(request):
    articles = Article.objects.all()
    return render(request, "blog.html",{"articles":articles})

@login_required
def post(request):
    form = ArticleForm()
    return render(request, "post.html", {"form": form})

@login_required
def posted(request):
    form = ArticleForm(request.POST, request.FILES)
    if form.is_valid():
        article = form.save(commit=False)
        print(article.category_split_space)
        form.save()
        return render(request, "blog.html")

def view(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    return render(request, "view.html", {"article": article})
