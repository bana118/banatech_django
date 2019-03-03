from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    image = forms.ImageField(required=False,allow_empty_file=True, widget=forms.ClearableFileInput(attrs={'multiple': True}))
    class Meta:
        model = Article
        fields = ('title', 'article', 'category_split_space',)