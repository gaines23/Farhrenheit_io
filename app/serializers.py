from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from .models import StreamingServices, Genre, FahrenheitUser 

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
        data['password'] = validated_data['password1']

        return User.objects.create(**data)
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'password1', 'password2'
        )
        read_only_fields = ('id',)


class FahrenheitUserSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = FahrenheitUser
        fields = "__all__"

class StreamingServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamingServices
        fields = ('provider_id', 'logo_path', 'provider_name')

class GenreSerlializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')