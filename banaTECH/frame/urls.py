from django.urls import path
import frame.views

urlpatterns = [
    path('', frame.views.topPage),
]