from django.urls import path
import hakogucha.views

urlpatterns = [
    path('', hakogucha.views.hakogucha),
]
