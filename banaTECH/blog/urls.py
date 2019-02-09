from django.urls import path
import blog.views

urlpatterns = [
    path('', blog.views.blog),
    path('post', blog.views.post),
    path('posted', blog.views.posted),
    path('<int:article_id>', blog.views.view),
    path('category/<str:category>', blog.views.search_category),
]
