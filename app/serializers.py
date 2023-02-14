from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    CustomUser,
    User_Following,
    User_App_Following,
    Follow_Request,
    User_App_Following,
    Fahrenheit_App_List,
    StreamingServices,
    Genre,
    EcstaStreamPlaylist,
    EcstaStreamProfile,
    EcstaStream_Playlists_Following,
    EcstaStream_User_Streaming_List,
    Ecstastream_Playlist_Data,

)
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  

        
class NewTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class UserCreateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)    

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match!')
        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }

        data['password'] = make_password(validated_data['password1'])

        return CustomUser.objects.create(**data)
    
    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'email', 'password1', 'password2'
        )
        read_only_fields = ('id',)



class UserUpdatePassword(serializers.Serializer):
    model = CustomUser

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserProfileSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(read_only=True)

    user_following = serializers.SerializerMethodField()
    user_followers = serializers.SerializerMethodField()
    user_apps_following = serializers.SerializerMethodField()
    apps_user_created = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        exclude = ('password', )
    
    def get_user_following(self, obj):
        return FollowingSerializer(obj.user_following.all(), many=True).data

    def get_user_followers(self, obj):
        return FollowersSerializer(obj.user_followers.all(), many=True).data

    def get_user_apps_following(self, obj):
        return AppFollowingSerializer(obj.following_app.all(), many=True).data

    def get_apps_user_created(self, obj):
        return FahrenheitAppSerializer(obj.app_created_by.all(), many=True).data



class AllUsersList(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'date_joined')

class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Following
        fields = '__all__'

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Following
        fields = ('id', 'user', 'date_added')



### App Info ##
class AppFollowingSerializer(serializers.ModelSerializer):
    app_info = serializers.SerializerMethodField()
    mute_notifications = serializers.BooleanField()

    class Meta:
        model = User_App_Following
        fields = '__all__'
    
    def get_app_info(self, obj):
        return AllAppsListSerializer(obj.following_app_id).data

    def update(self, instance, validated_data):
        instance.mute_notifications = validated_data.get('mute_notifications', instance.mute_notifications)
        instance.id = validated_data.get('id', instance.id)

        instance.save()
        return instance


class AppNotFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fahrenheit_App_List
        exclude = ('internal_app_status', )

class AllAppsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fahrenheit_App_List
        exclude = ('internal_app_status', )



class FahrenheitAppSerializer(serializers.ModelSerializer):
    date_added = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Fahrenheit_App_List
        fields = ('__all__')

    def update(self, instance, validated_data):
        instance.app_name = validated_data.get('app_name', instance.app_name)
        instance.app_base_link = validated_data.get('app_base_link', instance.app_base_link)
        instance.app_icon = validated_data.get('app_icon', instance.app_icon)
        instance.app_status = validated_data.get('app_status', instance.app_status)
    
        instance.save()
        return instance









### EcstaStream ###
class StreamingServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamingServices
        fields = ('provider_id', 'logo_path', 'provider_name')

class GenreSerlializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')



### Ec User Profile Details ###
class EcUserProfileSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(read_only=True)

    user_playlists = serializers.SerializerMethodField()
    playlist_following = serializers.SerializerMethodField()
    streaming_list_info = serializers.SerializerMethodField()

    class Meta:
        model = EcstaStreamProfile
        fields = ('__all__')

    def update(self, instance, validated_data):
        instance.profile_status = validated_data.get('profile_status', instance.profile_status)

        instance.save()
        return instance

    def get_user_playlists(self, obj):
        try:
            return AllEcPlaylistsSerializer(obj.playlists.all(), many=True).data
        except Exception:
            return 

    def get_playlist_following(self, obj):
        try:
            return EcUserPlaylistFollowingSerializer(obj.user_pl.all(), many=True).data
        except Exception:
            return 

    def get_streaming_list_info(self, obj):
        try:
            return StreamingServicesSerializer(obj.streaming_services.all(), many=True).data
        except Exception:
            return 



class EcstaStreamUsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcstaStreamProfile
        fields = ('__all__')


### All Playlists (without details) ###
class AllEcPlaylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcstaStreamPlaylist
        fields = ('__all__')
        read_only_fields = ('ec_playlist_id',)



### Playlist Details ###
class EcstaStreamPlaylistSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(read_only=True)

    # followers = serializers.SerializerMethodField()
    # movies_shows = serializers.SerializerMethodField()

    class Meta:
        model = EcstaStreamPlaylist
        fields = ('__all__')
        #read_only_fields = ('ec_playlist_id',)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.private = validated_data.get('private', instance.private)
        instance.description = validated_data.get('description', instance.description)
        instance.cover_img = validated_data.get('cover_img', instance.cover_img)
        instance.comments_on = validated_data.get('comments_on', instance.comments_on)

        instance.save()
        return instance

    # def get_followers(self, obj):
    #     return AllEcPlaylistFollowingSerializer(obj.playlist).data

    # def get_movies_shows(self, obj):
    #     return EcPlaylistDataSerializer(obj.pl_id).data

class AllEcPlaylistFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcstaStream_Playlists_Following
        fields = '__all__'


class EcPlaylistDataSerializer(serializers.ModelSerializer):
    pl_date_added = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Ecstastream_Playlist_Data
        fields = '__all__'


class EcUserPlaylistFollowingSerializer(serializers.ModelSerializer):
    app_info = serializers.SerializerMethodField()

    class Meta:
        model = EcstaStream_Playlists_Following
        fields = '__all__'
    
    def get_app_info(self, obj):
        return EcstaStreamPlaylistSerializer(obj.playlist).data


class EcUserStreamingListSerializer(serializers.ModelSerializer):
    app_info = serializers.SerializerMethodField()

    class Meta:
        model = EcstaStream_User_Streaming_List
        fields = '__all__'
    
    def get_app_info(self, obj):
        return EcstaStreamPlaylistSerializer(obj.streaming_id).data
