from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

def blog(request):
    return render(request, "blog.html")

def admin(request):
    return render(request, "admin.html")

@login_required
def post(request):
    return render(request, "post.html")