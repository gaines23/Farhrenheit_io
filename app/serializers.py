from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StreamingServices, Genre, FahrenheitUser

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "username", "password"

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