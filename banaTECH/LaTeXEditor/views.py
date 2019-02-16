from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import HttpResponse, HttpResponseBadRequest
from latex import build_pdf
import banaTECH.settings as settings
import os
import shutil
# Create your views here.


def editor(request):
    return render(request, "editor.html")


@require_POST
def saveTex(request):
    tex = request.POST["tex"]
    filename = "document.tex"
    response = HttpResponse(tex, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(
        filename)
    return response


@require_POST
def exportToPDF(request):
    tex = request.POST["tex"]
    response = HttpResponse(content_type='application/pdf')
    filename = "document.pdf"
    response['Content-Disposition'] = 'attachment; filename={0}'.format(
        filename)
    try:
        pdf = build_pdf(tex)
    except:
        return HttpResponseBadRequest("build pdf error!")
    else:
        response.write(bytes(pdf))
        return response
