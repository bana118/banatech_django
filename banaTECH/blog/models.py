from django.db import models
from django.db.models import CharField, DateTimeField
from django.utils import timezone

# Create your models here.

def blog(model):
    title = CharField(max_length=128)
    regist_date = DateTimeField(default=timezone.now)