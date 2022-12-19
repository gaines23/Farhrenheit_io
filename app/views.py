"""
Definition of views.
"""
import json
from django.shortcuts import render
from django.http import HttpRequest
from .forms import *
import environ
from .models import *
from .serializers import (
    UserCreateSerializer,
    StreamingServicesSerializer,
    GenreSerlializer,
    UserSerializer,
    UserUpdatePassword
)
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

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

class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = UserSerializer(request.user)
        return Response(user.data)

class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            if self.request.data.get('all'):
                token: OutstandingToken
                for token in OutstandingToken.objects.filter(user=request.user):
                    _, _ = BlacklistedToken.objects.get_or_create(token=token)
                return Response(status=status.HTTP_205_RESET_CONTENT)
            refresh_token = self.request.data.get('refresh_token')
            token = RefreshToken(token=refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



    # def post(self, request):
    #     try:
    #         refresh_token = request.data["refresh_token"]
    #         token = RefreshToken(refresh_token)
    #         token.blacklist()

    #         return Response(status=status.HTTP_205_RESET_CONTENT)
    #     except Exception as e:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

class UsersList(APIView):
    def get(self, request, *args, **kwargs):
        users = FahrenheitUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




#     def post(self, request):
#         serializer =

# class UserChangePassword(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self):
#         user = self.request.user
#         return user

#     def update(self, request, *args, **kwargs):
#         serializer = UserUpdatePassword(data=request.data)
#         if serializer.is_valid():
#             if not




# class CreatePlaylist(APIView):
#     def


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
        #context,
    )