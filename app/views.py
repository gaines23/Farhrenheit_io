"""
Definition of views.
"""
import json
from django.shortcuts import render
from django.http import HttpRequest
from .forms import *
import environ
from .models import (
    CustomUser,
    User_Following,
    User_App_Following,
    Fahrenheit_App_List,
    EcstaStreamProfile,
    Genre,
    StreamingServices
)
from .serializers import (
    CreateNewAppSerializer,
    NewTokenObtainPairSerializer,
    UserCreateSerializer,
    StreamingServicesSerializer,
    GenreSerlializer,
    UserProfileSerializer,
    AllUsersList,
    FollowingSerializer,
    FollowersSerializer,
    AppFollowingSerializer,
    CreateNewAppSerializer,
    AllAppsList,
    # UserUpdatePassword,
    EcCreateNewUser,
    EcCreatePlaylist
)
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
import uuid

env = environ.Env()
environ.Env.read_env()

    # authentication_classes=[ SessionAuthentication ]
    # permission_classes = [IsAuthenticated]

## env\Scripts\activate


class NewTokenObtainPairView(TokenObtainPairView):
    serializer_class = NewTokenObtainPairSerializer

class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserProfile(APIView):   
    def get(self, request, format='json', *args, **kwargs):
        user = CustomUser.objects.get(id=request.user.id)# self.request.id'7a20448e-b5f4-465b-8a9a-af2694e0984a'
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)




class UsersList(APIView):
    def get(self, *args):
        user = CustomUser.objects.all()
        serializer = AllUsersList(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            if self.request.data.get('all'):
                token: OutstandingToken
                for token in OutstandingToken.objects.filter(user=request.CustomUser.id):
                    _, _ = BlacklistedToken.objects.get_or_create(token=token)
                return Response(status=status.HTTP_205_RESET_CONTENT)
            refresh_token = self.request.data.get('refresh_token')
            token = RefreshToken(token=refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)




class CreateNewApp(APIView):
    def post(self, request):
        app = Fahrenheit_App_List.objects.create(data=request.data)
        serlialzer = CreateNewAppSerializer(app)
        return Response(serlialzer.data, status=status.HTTP_200_OK)

class AppList(APIView):
    def get(self, *args):
        app = Fahrenheit_App_List.objects.all()
        serializer = AllAppsList(app, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserAppFollowing(APIView):
    ### All apps user follows
    def get(self, request, *args):
        app = User_App_Following.objects.filter(user=request.user.id)#self.request.id
        serializer = AppFollowingSerializer(app, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    ### User adds new app to follow
    def post(self, request):
        app = User_App_Following.objects.create(user=request.user.id)
        serializer = AppFollowingSerializer(app)
        return Response(serializer.data, status=status.HTTP_200_OK)

    ### User deletes app following
    def delete(self, request):
        app = User_App_Following.objects.get(id=id).delete()
        return Response(app, status=status.HTTP_200_OK)



class UserFollowing(APIView):
    def get(self, request, *args):
        app = User_Following.objects.filter(user=request.user.id)#self.request.id
        serializer = FollowingSerializer(app, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        app = User_Following.objects.create(user=request.user.id)
        serializer = FollowingSerializer(app)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        app = User_Following.objects.get(id=id).delete()
        return Response(app, status=status.HTTP_200_OK)



class UserFollowers(APIView):
    def get(self, request, *args):
        app = User_Following.objects.filter(user=request.user.id)#self.request.id
        serializer = FollowersSerializer(app, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        app = User_Following.objects.create(user=request.user.id)
        serializer = FollowersSerializer(app)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        app = User_Following.objects.get(id=id).delete()
        return Response(app, status=status.HTTP_200_OK)







# class UserChangePassword(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self):
#         user = self.request.user
#         return user

#     def update(self, request, *args, **kwargs):
#         serializer = UserUpdatePassword(data=request.data)
#         if serializer.is_valid():
#             if not


class CreateEcstaStreamUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        create_user = EcCreateNewUser(user_id=request.data)
        if create_user.is_valid():
            user = create_user.save()
            if user:
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(create_user.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePlaylist(APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request, format='json'):
        serializer = EcCreatePlaylist(data=request.data)
        if serializer.is_valid():
            created_by = uuid.UUID(serializer['created_by']).hex
            playlist = serializer.save(created_by)
            if playlist:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class StreamingList(APIView):
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