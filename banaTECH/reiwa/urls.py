from django.urls import path
import reiwa.views

urlpatterns = [
    path('', reiwa.views.reiwa),
    path('solo', reiwa.views.solo),
]
