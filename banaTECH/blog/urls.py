from django.urls import path
import blog.views

urlpatterns = [
    path('', blog.views.blog),
    path('post', blog.views.post),
    path('posted', blog.views.posted),
]