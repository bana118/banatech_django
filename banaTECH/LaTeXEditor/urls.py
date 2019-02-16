from django.urls import path
import LaTeXEditor.views as latex

urlpatterns = [
    path('', latex.editor),
    path('saveTex', latex.saveTex),
]
