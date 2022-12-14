from rest_framework import serializers
from .models import StreamingServices, Genre, FahrenheitUser

class FahrenheitUserSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = FahrenheitUser
        fields = ('__all__')

class StreamingServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamingServices
        fields = ('provider_id', 'logo_path', 'provider_name')

class GenreSerlializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')