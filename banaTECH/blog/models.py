from django.db import models
from django.db.models import CharField, FileField, DateTimeField
from django.utils import timezone

# Create your models here.

class Article(models.Model):
    title = CharField(max_length=128)
    article = models.FileField(upload_to="article/")
    post_date = DateTimeField(default=timezone.now)