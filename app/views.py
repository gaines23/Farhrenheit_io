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
    StreamingServices,
    EcstaStreamPlaylist,
    EcstaStream_Playlists_Following,
    EcstaStream_User_Steaming_List,

)
from .serializers import (
    NewTokenObtainPairSerializer,
    UserCreateSerializer,
    StreamingServicesSerializer,
    GenreSerlializer,
    UserProfileSerializer,
    AllUsersList,
    FollowingSerializer,
    FollowersSerializer,
    AppFollowingSerializer,
    FahrenheitAppSerializer,
    AllAppsListSerializer,
    # UserUpdatePassword,
    EcUserProfileSerializer,
    EcstaStreamPlaylistSerializer,
    EcUserPlaylistFollowingSerializer,
    EcUserStreamingListSerializer,
    EcstaStreamUsersListSerializer,
)
from rest_framework.views import APIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
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
    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserProfile(APIView):   
    def get(self, request, format='json', *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=request.user.id)# self.request.id'7a20448e-b5f4-465b-8a9a-af2694e0984a'
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response('No user found with that username. Please register first.', status=status.HTTP_400_BAD_REQUEST)




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
                for token in OutstandingToken.objects.filter(user=request.user.id):
                    _, _ = BlacklistedToken.objects.get_or_create(token=token)
                return Response(status=status.HTTP_205_RESET_CONTENT)
            refresh_token = self.request.data.get('refresh_token')
            token = RefreshToken(token=refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)




class UserFahrenheitApps(APIView):
    def post(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=self.request.user.id)

        data = {
            "created_by": uuid.UUID(str(user.id)),
            "app_name": request.data['app_name'],
            "app_base_link": request.data['app_base_link'],
            "app_icon": request.data['app_icon'],
            "app_status": request.data['app_status']
        }

        serlialzer = FahrenheitAppSerializer(data=data)
        if serlialzer.is_valid():
            serlialzer.save()
            return JsonResponse(serlialzer.data, status=status.HTTP_200_OK)
        return Response(serlialzer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        app = Fahrenheit_App_List.objects.get(id=request.data['id'])

        data = {
            "app_name": request.data['app_name'],
            "app_base_link": request.data['app_base_link'],
            "app_icon": request.data['app_icon'],
            "app_status": request.data['app_status']
        }

        serializer = FahrenheitAppSerializer(app, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, stataus=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.data['id']
        app = Fahrenheit_App_List.objects.get(id=id).delete()
        return Response(app, status=status.HTTP_200_OK)


class AppList(APIView):
    def get(self, *args):
        try:
            app = Fahrenheit_App_List.objects.all()
            serializer = AllAppsListSerializer(app, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)


class UserAppFollowing(APIView):
    def get_object(self):
        return self.request.user.id

    ### All apps user follows
    def get(self, request, format='json', *args):
        try:
            app = User_App_Following.objects.filter(user=self.request.user)
            serializer = AppFollowingSerializer(app, many=True).data
            return Response(serializer, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_204_NO_CONTENT)

    ### User adds new app to follow
    def post(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=self.request.user.id)
        
        app = {
            "user": uuid.UUID(str(user.id)),
            "following_app_id": request.data['following_app_id'],
            "mute_notifications": False
        }
        
        serializer = AppFollowingSerializer(data=app)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ### User deletes app following
    def delete(self, request):
        id = request.data['id']
        app = User_App_Following.objects.get(id=id).delete()
        return Response(app, status=status.HTTP_200_OK)

    ### Edits mute notificaions -> on/off
    def put(self, request, *args, **kwargs):
        id = request.data['id']
        app = User_App_Following.objects.get(id=id)
        data = {
            "id": app,
            "mute_notifications": request.data['mute_notifications']
        }

        serializer = AppFollowingSerializer(instance=app, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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

    def delete(self):
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




### EcstaStream ###

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


class EcstaStreamUserList(APIView):
    def get(self, request, *args, **kwargs):
        try:
            profiles = EcstaStreamProfile.objects.all()
            serializer = EcstaStreamUsersListSerializer(profiles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response('No Users', status=status.HTTP_204_NO_CONTENT)



class EcstaStreamUserProfile(APIView):
    def get(self, request):
        try:
            profile = EcstaStreamProfile.objects.get(user_id=request.user.id)
            serializer = EcUserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response('No User with that id/username', status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=self.request.user.id)
        
        data = {
            "user_id": uuid.UUID(str(user.id)),
            "status": 0,
            "profile_status": 0
        }
        
        serializer = EcUserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        user = EcstaStreamProfile.objects.get(user_id=self.request.user.id)
        app = {
            "profile_status": request.data['profile_status'],
            "ec_id": request.data['ec_id']
        }

        serializer = EcUserProfileSerializer(instance=user, data=app, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.data['ec_id']
        profile = EcstaStreamProfile.objects.get(id=id).delete()
        return Response(profile, status=status.HTTP_200_OK)


class EcstaStreamPlaylists(APIView):
    def get(self, request, *args, **kwargs):
        try:
            playlists = EcstaStreamPlaylist.objects.all()
            serializer = EcstaStreamPlaylistSerializer(data=playlists)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response('No Playlists Found', status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        user = EcstaStreamProfile.objects.get(ec_id=request.data['ec_id'])

        data = {
            "created_by": user,
            "title": request.data['title'],
            "private": request.data['private'],
            "description": request.data['description'],
            "cover_img": request.data['cover_img'],
            "comments_on": request.data['comments_on'] 
        }

        serializer = EcstaStreamPlaylistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        profile_id = EcstaStreamProfile.objects.get(ec_playlist_id=request.data['ec_playlist_id'])
        data = {
            "title": request.data['title'],
            "private": request.data['private'],
            "description": request.data['description'],
            "cover_img": request.data['cover_img'],
            "comments_on": request.data['comments_on'] 
        }

        serializer = EcstaStreamPlaylistSerializer(instance=profile_id, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    ### delete after 30 days
    def delete(self, request):
        id = request.data['ec_playlist_id']
        playlist = EcstaStreamPlaylist.objects.get(id=id).delete()
        return Response(playlist, status=status.HTTP_200_OK)


class EcstaPlaylistFollowing(APIView):
    ### All playlists user follows
    def get(self, request, *args, **kwargs):
        try:
            following = User_App_Following.objects.filter(user_following=request.data['ec_id'])
            serializer = AppFollowingSerializer(following, many=True).data
            return Response(serializer, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_204_NO_CONTENT)

    ### User adds new playlist to follow
    def post(self, request, *args, **kwargs):
        user = EcstaStreamProfile.objects.get(user_following=request.data['ec_id'])
        
        app = {
            "user_following": user.ec_id,
            "playlist_id": request.data['playlist_id'],
        }
        
        serializer = EcUserPlaylistFollowingSerializer(data=app)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ### User deletes playlists following
    def delete(self, request):
        id = request.data['id']
        following = EcstaStream_Playlists_Following.objects.get(id=id).delete()
        return Response(following, status=status.HTTP_200_OK)


class EcstaUserStreamingList(APIView):
    ### All playlists user follows
    def get(self, request, *args, **kwargs):
        try:
            streaming = EcstaStream_User_Steaming_List.objects.filter(user_streaming=request.data['ec_id'])
            serializer = EcUserStreamingListSerializer(streaming, many=True).data
            return Response(serializer, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_204_NO_CONTENT)

    ### User adds new playlist to follow
    def post(self, request, *args, **kwargs):
        streaming = EcstaStreamProfile.objects.get(user_streaming=request.data['ec_id'])
        
        app = {
            "user_streaming": streaming.ec_id,
            "playlist_id": request.data['playlist_id'],
        }
        
        serializer = EcUserPlaylistFollowingSerializer(data=app)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ### User deletes playlists following
    def delete(self, request):
        id = request.data['id']
        streaming = EcstaStream_User_Steaming_List.objects.get(id=id).delete()
        return Response(streaming, status=status.HTTP_200_OK)


def home(request):
    assert isinstance(request, HttpRequest)

    # movie_test = movie.details('tt1478338')

    # context = {'movie': movie_test}

    return render(
        request,
        'index.html',
        #context,
    )