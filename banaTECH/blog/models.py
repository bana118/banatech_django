from django.db import models
from django.db.models import CharField, FileField, DateTimeField, ManyToManyField, ImageField
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
import os.path

# Create your models here.

class Category(models.Model):
    name = CharField(max_length=128)

def md_file_path(instance, filename):
    fn, ext = os.path.splitext(filename)
    return "article/{id}/{id}{ext}".format(id=instance.pk, ext=ext)
class Article(models.Model):
    title = CharField(max_length=128)
    article = FileField(upload_to=md_file_path)
    image = ImageField(upload_to=image_file_path)
    post_date = DateTimeField(default=timezone.now)
    #スペース区切りのカテゴリー
    category_split_space = CharField(max_length=128)
    category = ManyToManyField(Category)

#articleの保存ディレクトリ名にprimary keyを使うため
_UNSAVED_FILEFIELD = 'unsaved_filefield'
@receiver(pre_save, sender=Article)
def skip_saving_file(sender, instance, **kwargs):
    if not instance.pk and not hasattr(instance, _UNSAVED_FILEFIELD):
        setattr(instance, _UNSAVED_FILEFIELD, instance.article)
        instance.article = None

@receiver(post_save, sender=Article)
def save_file(sender, instance, created, **kwargs):
    if created and hasattr(instance, _UNSAVED_FILEFIELD):
        instance.article = getattr(instance, _UNSAVED_FILEFIELD)
        instance.save()
        instance.__dict__.pop(_UNSAVED_FILEFIELD)
