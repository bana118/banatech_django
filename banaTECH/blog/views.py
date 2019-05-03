from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponse
from django.utils import timezone
from .models import Article, Category
from .forms import ArticleForm
from django.conf import settings
import os
import shutil
import xml.etree.ElementTree as ET
import datetime
from xml.dom import minidom
import re
# Create your views here.


def blog(request):
    articles = Article.objects.all().order_by("post_date").reverse()
    return render(request, "blog.html", {"articles": articles})

#xmlフォーマット用
def prettify(elem):
    rough_string = ET.tostring(elem, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    pretty = re.sub(r"[\t ]+\n", "", reparsed.toprettyxml(indent="\t"))
    pretty = pretty.replace(">\n\n\t<",">\n\t<")
    return pretty

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
        os.makedirs(settings.BASE_DIR + "/media/article/" +
                    str(article.id) + "/image")
        for image in request.FILES.getlist("image"):
            with open(settings.BASE_DIR + "/media/article/" + str(article.id) + "/image/" + image.name, "wb+") as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        category_list = article.category_split_space.split()
        for c in category_list:
            # 新規カテゴリーを作成
            if len(categories.filter(name=c)) == 0:
                new_category = Category(name=c)
                new_category.save()
                article.category.add(new_category)
            else:
                category = categories.filter(name=c)[0]
                article.category.add(category)
        article.save()

        # sitemap.xmlへの追加
        xmlTree = ET.parse(settings.BASE_DIR + "/static/sitemap/sitemap.xml")
        ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        root = xmlTree.getroot()
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        lastmod = ET.SubElement(url, "lastmod")
        priority = ET.SubElement(url, "priority")
        loc.text = "https://banatech.tk/blog/" + str(article.id)
        dt = datetime.datetime.strptime(str(timezone.datetime.now()), "%Y-%m-%d %H:%M:%S.%f")
        lastmod.text = dt.strftime("%Y-%m-%dT%H:%M:%S+00:00")
        priority.text = "0.64"
        with open(settings.BASE_DIR + "/static/sitemap/sitemap.xml",mode='w') as f:
            f.write(prettify(root))
        articles = Article.objects.all().order_by("post_date").reverse()
        return render(request, "blog.html", {"articles": articles})


def view(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    categories = article.category.all()
    relatedList = Article.objects.filter(
        Q(category__in=categories), ~Q(id=article.id)).distinct()
    relatedArticles = relatedList.order_by("post_date").reverse()[0:3]
    return render(request, "view.html", {"article": article, "relatedArticles": relatedArticles})


def search_category(request, category):
    articles = Article.objects.filter(
        category__name=category).order_by("post_date").reverse()
    return render(request, "search_category.html", {"category": category, "articles": articles})


def search(request):
    search = request.POST["search"]
    articles = Article.objects.filter(
        Q(category__name__icontains=search) | Q(title__icontains=search)
    ).distinct().order_by("post_date").reverse()
    return render(request, "search.html", {"search": search, "articles": articles})


@login_required
def delete(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    deletePath = settings.BASE_DIR + "/media/article/" + str(article_id)
    if os.path.exists(deletePath):
        shutil.rmtree(deletePath)
    if not article is None:
        article.delete()

    # sitemap.xmlからの削除
    xmlTree = ET.parse(settings.BASE_DIR + "/static/sitemap/sitemap.xml")
    root = xmlTree.getroot()
    deleteURL = "https://banatech.tk/blog/" + str(article_id)
    for url in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        if url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text == deleteURL:
            root.remove(url)
    with open(settings.BASE_DIR + "/static/sitemap/sitemap.xml",mode='w') as f:
        f.write(prettify(root))

    articles = Article.objects.all().order_by("post_date").reverse()
    return render(request, "blog.html", {"articles": articles})


@login_required
def edit(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    editPath = settings.BASE_DIR + "/media/article/" + \
        str(article.id) + "/" + str(article.id) + ".md"
    with open(editPath, "r", encoding='utf-8') as md:
        content = md.read()
    return render(request, "edit.html", {"article": article, "content": content})


@login_required
def edited(request, article_id):
    article = Article.objects.filter(id=article_id)[0]
    title = request.POST["title"]
    category_split_space = request.POST["category"]
    content = request.POST["content"]
    imgCheck = request.POST["imgCheck"]

    article.title = title
    article.category_split_space = category_split_space
    article.category.clear()
    article.save()
    category_list = category_split_space.split()
    categories = Category.objects.all()
    for c in category_list:
        if len(categories.filter(name=c)) == 0:
            new_category = Category(name=c)
            new_category.save()
            article.category.add(new_category)
        else:
            category = categories.filter(name=c)[0]
            article.category.add(category)
    article.post_date = timezone.datetime.now()
    article.save()

    editPath = settings.BASE_DIR + "/media/article/" + \
        str(article.id) + "/" + str(article.id) + ".md"
    with open(editPath, "w", encoding='utf-8', newline="\n") as md:
        md.write(content)

    if imgCheck == "on":
        os.makedirs(settings.BASE_DIR + "/media/article/" +
                    str(article.id) + "/image", exist_ok=True)
        for image in request.FILES.getlist("image"):
            with open(settings.BASE_DIR + "/media/article/" + str(article.id) + "/image/" + image.name, "wb+") as destination:
                for chunk in image.chunks():
                    destination.write(chunk)

    # sitemap.xmlの更新
    xmlTree = ET.parse(settings.BASE_DIR + "/static/sitemap/sitemap.xml")
    root = xmlTree.getroot()
    for url in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        editURL = "https://banatech.tk/blog/" + str(article_id)
        if url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text == editURL:
            dt = datetime.datetime.strptime(str(timezone.datetime.now()), "%Y-%m-%d %H:%M:%S.%f")
            url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod").text = dt.strftime("%Y-%m-%dT%H:%M:%S+00:00")
    with open(settings.BASE_DIR + "/static/sitemap/sitemap.xml",mode='w') as f:
        f.write(prettify(root))

    articles = Article.objects.all().order_by("post_date").reverse()
    return render(request, "blog.html", {"articles": articles})


def view_md(request, article_id):
    mdPath = settings.BASE_DIR + "/media/article/" + \
        str(article_id) + "/" + str(article_id) + ".md"
    mdFile = open(mdPath, encoding="UTF-8")
    md = mdFile.read()
    mdFile.close()
    return HttpResponse(md, content_type="text/plain; charset=utf-8")
