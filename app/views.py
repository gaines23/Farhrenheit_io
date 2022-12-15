"""
Definition of views.
"""
import json
from django.shortcuts import render
from django.http import HttpRequest
from .forms import *


#from .filters import *
from django.contrib.admin.views.decorators import staff_member_required
import environ

from .models import *
from .serializers import UserCreateSerializer, StreamingServicesSerializer, GenreSerlializer, FahrenheitUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


env = environ.Env()
environ.Env.read_env()

    # authentication_classes=[ SessionAuthentication ]
    # permission_classes = [IsAuthenticated]

## env\Scripts\activate

class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                FahrenheitUser.objects.create(user=user)
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        



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