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
        return CreateNewAppSerializer(obj.app_created_by.all(), many=True).data


### class UserEditProfileSerializer(serializers.ModelSerializer):



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

    #user = serializers.UUIDField()
    #following_app_id = serializers.IntegerField()
    mute_notifications = serializers.BooleanField()

    class Meta:
        model = User_App_Following
        fields = '__all__'
    
    def get_app_info(self, obj):
        return AllAppsList(obj.following_app_id).data

    # def create(self, obj):
    #     return User_App_Following.objects.create(*obj)

    def update(self, instance, validated_data):
        instance.mute_notifications = validated_data.get('mute_notifications', instance.mute_notifications)
        instance.id = validated_data.get('id', instance.id)

        instance.save()
        return instance

class AllAppsList(serializers.ModelSerializer):
    class Meta:
        model = Fahrenheit_App_List
        exclude = ('internal_app_status', )

class CreateNewAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fahrenheit_App_List
        fields = ('created_by', 'app_name', 'app_base_link', 'app_icon')
        read_only_fields = ('created_by',)






class EcCreateNewUser(serializers.ModelSerializer):
    model = EcstaStreamProfile
    fields = ('id', 'user_id')
    read_only_fields = ('id',)
    

class EcCreatePlaylist(serializers.ModelSerializer):
    class Meta:
        model = EcstaStreamPlaylist
        fields = ('created_by', 'title', 'private', 'description') #playlist_follows
    

class StreamingServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamingServices
        fields = ('provider_id', 'logo_path', 'provider_name')

class GenreSerlializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')