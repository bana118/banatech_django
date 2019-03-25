from django.urls import path
import aiBeats.views

urlpatterns = [
    path('', aiBeats.views.aiBeats),
]
