from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Article, Category
from .forms import ArticleForm
import banaTECH.settings as settings
import os
# Create your views here.

def blog(request):
    articles = Article.objects.all()
    return render(request, "blog.html", {"articles":articles})

@login_required
def post(request):
    articleForm = ArticleForm()
    return render(request, "post.html", {"articleForm": articleForm})

@login_required
def posted(request):
    form = ArticleForm(request.POST, request.FILES)
    categories = Category.objects.all()
    if form.is_valid():
        article = form.save()
        os.makedirs(settings.BASE_DIR + "/media/article/" + str(article.id) + "/image")
        for image in request.FILES.getlist("image"):
            with open(settings.BASE_DIR + "/media/article/" + str(article.id) + "/image/" + image.name, "wb+") as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        category_list = article.category_split_space.split()
        for c in category_list:
            #新規カテゴリーを作成
            if len(categories.filter(name=c)) == 0:
                new_category = Category(name=c)
                new_category.save()
                article.category.add(new_category)
            else:
                category = categories.filter(name=c)[0]
                article.category.add(category)
        articles = Article.objects.all()
        return render(request, "blog.html", {"articles", articles})

def view(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    categories = article.category.all()
    return render(request, "view.html", {"article": article, "categories": categories})

def search_category(request, category):
    return render(request, "search_category.html", {"category": category})
