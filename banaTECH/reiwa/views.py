from django.shortcuts import render

# Create your views here.

def reiwa(request):
    return render(request, "reiwa.html")
    