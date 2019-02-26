from django.shortcuts import render

# Create your views here.

def topPage(request):
    return render(request, "topPage.html")

def privacyPolicy(request):
    return render(request, "privacy_policy.html")
