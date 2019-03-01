from django.urls import path
import kurukuru.views

urlpatterns = [
    path('', kurukuru.views.kurukuru),
]
