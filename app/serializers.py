# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import (
#     StreamingServices,
#     Genre,
#     FahrenheitUser,
#     # EcstaStreamPlaylist,
#     # EcstaStreamProfile
# )
# from django.contrib.auth.hashers import make_password
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# class NewTokenObtainSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, fahrenheit_user):
#         token = super(NewTokenObtainSerializer, cls).get_token(fahrenheit_user)

#         token['id'] = fahrenheit_user.id
#         return token

# class UserSerializer(serializers.ModelSerializer):
#     date_created = serializers.DateTimeField(read_only=True)

#     class Meta:
#         model = FahrenheitUser
#         exclude = ('password', )

# class UserCreateSerializer(serializers.ModelSerializer):
#     password1 = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)

#     def validate(self, data):
#         if data['password1'] != data['password2']:
#             raise serializers.ValidationError('Passwords must match!')
#         return data

#     def create(self, validated_data):
#         data = {
#             key: value for key, value in validated_data.items()
#             if key not in ('password1', 'password2')
#         }

#         data['password'] = make_password(validated_data['password1'])

#         return FahrenheitUser.objects.create(**data)
    
#     class Meta:
#         model = FahrenheitUser
#         fields = (
#             'id', 'username', 'email', 'password1', 'password2'
#         )
#         read_only_fields = ('id',)

# class UserUpdatePassword(serializers.Serializer):
#     model = FahrenheitUser

#     old_password = serializers.CharField(required=True)
#     new_password = serializers.CharField(required=True)



# # class EcCreateNewUser(serializers.Serializer):
# #     model = EcstaStreamProfile
# #     fields = '__all__'
    

# # class EcCreatePlaylist(serializers.ModelSerializer):
# #     created_by = serializers.Field(source=User.id, required=True)

# #     class Meta:
# #         model = EcstaStreamPlaylist
# #         fields = ('created_by', 'title', 'private', 'description') #playlist_follows
    

# class StreamingServicesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StreamingServices
#         fields = ('provider_id', 'logo_path', 'provider_name')

# class GenreSerlializer(serializers.ModelSerializer):
#     class Meta:
#         model = Genre
#         fields = ('id', 'genre')