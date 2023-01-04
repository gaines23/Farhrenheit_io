from .serializers import UserProfileSerializer #you have already created UserSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    user = UserProfileSerializer(user, context={'request': request}).data
    return {
        'token': token,
        'id': user['id'],
    }