from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import HttpResponse

# Create your views here.


def editor(request):
    return render(request, "editor.html")


def saveTex(request):
    tex = request.POST["tex"]
    filename = "document.tex"
    response = HttpResponse(tex, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(filename)
    return response
