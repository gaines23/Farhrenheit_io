"""
Definition of views.
"""

from datetime import datetime, date, time
import json, requests
from django.contrib import messages
from django.views import View
from django.views.generic import TemplateView, ListView
from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect, reverse
from django.template import loader, Context
from django.views import generic
from django.http import HttpRequest
from .forms import *
from django.forms.models import model_to_dict
from django.urls import reverse_lazy
from django.forms.widgets import *
from django.db.models import Count
from django.forms import ModelForm
from django.contrib.auth.views import LoginView, PasswordResetView, PasswordChangeView
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Q, F
#from .filters import *
from django.contrib.admin.views.decorators import staff_member_required
from tmdbv3api import *
import os
import environ
from django.db.models.functions import ExtractYear
from tmdbv3api.tmdb import TMDb

from .models import *
from .serializers import StreamingServicesSerializer, GenreSerlializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

env = environ.Env()
environ.Env.read_env()
tmdb_key = env('TMDB_API_KEY')
tmdb = TMDb()
tmdb.tmdb_key = tmdb_key



movie = Movie()
tv = TV()
series = Collection()
person = Person()
search = Search()

Imdb_URL = env('IMDB_URL')
URL_API = env('RAPID_API_KEY')






## env\Scripts\activate


class StreamingList(APIView):
    #permission_classes = [permissions.IsAdminUser]
    
    ### GET ###
    def get(self, request, *args, **kwargs):
        services = StreamingServices.objects.all()
        serializer = StreamingServicesSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllGenreList(APIView):

    def get(self, request, *args, **kwargs):
        services = Genre.objects.all()
        serializer = GenreSerlializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class SingleGenre(APIView):
#     def get(self, requests, *args, **kwargs):
#         services = Genre.




def home(request):
    assert isinstance(request, HttpRequest)

    # movie_test = movie.details('tt1478338')

    # context = {'movie': movie_test}

    return render(
        request,
        'index.html',
        context,
    )